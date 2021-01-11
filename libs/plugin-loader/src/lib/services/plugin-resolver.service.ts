import { Component, Injectable, NgModule } from '@angular/core';
import PluginsConfig from '../../configs/plugins.config';
import { loadRemoteModule } from '@angular-architects/module-federation';
import PluginsUtility from '../utils/plugins.utility';
import { Router, Routes } from '@angular/router';
import PluginsInterface from '../interfaces/plugins.interface';
import { BehaviorSubject } from 'rxjs';
import LoadOptionsInterface from '../interfaces/load-options.interface';

@Injectable({
  providedIn: 'root'
})
export class PluginResolverService {
  private loadedPlugins: any = {};
  private loadedConfigs: PluginsInterface[] = [];
  private loadedComponents: any = {};
  private _isLoadingPlugins = new BehaviorSubject<boolean>(false);
  private _isLoaded = new BehaviorSubject<boolean>(false);
  private _initRoutes?: Routes;
  constructor() {}

  async loadPlugins(options: LoadOptionsInterface) {
    this._isLoadingPlugins.next(true);
    for (const i of PluginsConfig) {
      try {
        const plugin = await loadRemoteModule(PluginsUtility.convertToRemoteModuleOptions(i, options.production));
        this.checkEntries(plugin, i);
        this.loadExportedComponents(plugin);
      } catch (e) {
        console.error(`Plugin "${i.name}" not found`, e);
      }
    }
    this._isLoadingPlugins.next(false);
    this._isLoaded.next(true);
    if (options.router && options.routePath) {
      this.buildRoutes(options.routePath, options.router);
      console.log('New Routes : ', options.router.config);
    }
    console.log('Shared components :', this.loadedComponents);
  }
  private checkEntries(plugin: any, config: PluginsInterface) {
    if (!this.loadedPlugins[config.remoteName]) {
      this.loadedPlugins[config.remoteName] = plugin;
      this.loadedConfigs.push(config);
    }
  }
  private loadExportedComponents(plugin: any) {
    const appModule = this.getModule(plugin);
    try{
      const args = this.getModuleArgs(appModule);
      if (args.exports) {
        for (let i of args.exports) {
          const compArgs = this.getComponentArgs(i);
          const comp = {};
          comp[compArgs.selector] = i;
          this.loadedComponents = {...this.loadedComponents, ...comp};
        }
      }
    } catch (e) {
      console.log('Component load error', e);
    }

  }
  private getModuleArgs(module: any): NgModule | undefined {
    try{
      return module.decorators[0].args[0];
    } catch (e) {
      console.log('Args loading error', e);
      return undefined;
    }
  }
  private getComponentArgs(component: any): Component | undefined {
    return this.getModuleArgs(component);
  }
  private buildRoutes(currentPath: string, router: Router) {
    // const pluginRoutes: Routes = this.loadedConfigs.map(i => ({
    //   path: i.remoteName,
    //   loadChildren: () => this.getModule(i)[i.componentName]
    // }));
    // let newConfig = router.config;
    // for (const i of newConfig) {
    //   if (i.path === currentPath) {
    //     // @ts-ignore
    //     const loadedConfig = i._loadedConfig;
    //     if (!this._initRoutes) {
    //       this._initRoutes = loadedConfig.routes;
    //     }
    //     loadedConfig.routes = [...this._initRoutes, ...pluginRoutes];
    //     break;
    //   }
    // }
    // router.resetConfig(newConfig);
    // console.log('New Routes : ', router.config);

    const pluginRoutes: Routes = this.loadedConfigs.map(i => ({
      path: `${currentPath}/${i.remoteName}`,
      loadChildren: () => this.getModule(this.getPlugin(i))
    }));
    if (!this._initRoutes) {
      this._initRoutes = router.config;
    }
    router.resetConfig([...this._initRoutes, ...pluginRoutes]);
  }
  get plugins() {
    return this.loadedPlugins;
  }
  get configs() {
    return this.loadedConfigs;
  }
  get isLoadingPlugins() {
    return this._isLoadingPlugins;
  }
  get isLoaded() {
    return this._isLoaded;
  }
  getPlugin(config: PluginsInterface) {
    return this.loadedPlugins[config.remoteName];
  }
  getModule(plugin: any) {
    let key = Object.keys(plugin)[0];
    return plugin[key];
  }
  getComponent(selector: string): any | undefined {
    return this.loadedComponents[selector];
  }
}
