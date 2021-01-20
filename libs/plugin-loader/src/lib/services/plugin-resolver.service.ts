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
  private _options: LoadOptionsInterface;
  constructor() {}

  async loadPlugins(options: LoadOptionsInterface) {
    this._options = options;
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
    if (!this.loadedPlugins[config.uniqueName]) {
      this.loadedPlugins[config.uniqueName] = plugin;
      this.loadedConfigs.push(config);
    }
  }
  private loadExportedComponents(plugin: any) {
    const module = this.getModule(plugin);
    this.addExportedComponents(module);
  }
  private addExportedComponents(module: any) {
    try {
      if (this._options.production) {
        let args = module.ɵmod;
        for (let i of args.exports) {
          if (i.ɵmod) {
            this.addExportedComponents(i);
          } else {
            let comp = {};
            comp[i.ɵcmp.selectors[0][0]] = i;
            this.loadedComponents = { ...this.loadedComponents, ...comp };
          }
        }
      } else {
        let args = this.getModuleArgs(module) as NgModule;
        for (let i of args.exports) {
          let compArgs = this.getModuleArgs(i);
          if (compArgs.exports) {
            this.addExportedComponents(i);
          } else {
            let comp = {};
            comp[compArgs.selector] = i;
            this.loadedComponents = { ...this.loadedComponents, ...comp };
          }
        }
      }
    }catch (e) {
      console.log('Component load error', e);
    }
  }
  private getModuleArgs(module: any): any {
    try{
      return module.decorators[0].args[0];
    } catch (e) {
      console.log('Args loading error', e);
      return undefined;
    }
  }
  private buildRoutes(currentPath: string, router: Router) {
    const pluginRoutes: Routes = this.loadedConfigs.map(i => ({
      path: `${currentPath}/${i.uniqueName}`,
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
    return this.loadedPlugins[config.uniqueName];
  }
  getModule(plugin: any) {
    let key = Object.keys(plugin)[0];
    return plugin[key];
  }
  getComponent(selector: string): any | undefined {
    return this.loadedComponents[selector];
  }
}
