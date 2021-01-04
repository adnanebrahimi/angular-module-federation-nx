import { Injectable } from '@angular/core';
import { PluginsConfig } from '../../../configs/plugins.config';
import { loadRemoteModule } from '@angular-architects/module-federation';
import PluginsUtility from '../utils/plugins.utility';
import { Router, Routes } from '@angular/router';
import PluginsInterface from '../interfaces/plugins.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PluginResolverService {
  private loadedPlugins: any = {};
  private loadedConfigs: PluginsInterface[] = [];
  private _isLoadingPlugins = new BehaviorSubject<boolean>(false);
  private _isLoaded = new BehaviorSubject<boolean>(false);
  private _initRoutes?: Routes;
  constructor() {}

  async loadPlugins() {
    this._isLoadingPlugins.next(true);
    for (const i of PluginsConfig) {
      try {
        const module = await loadRemoteModule(PluginsUtility.convertToRemoteModuleOptions(i));
        this.checkEntries(module, i);
      } catch (e) {
        console.error(`Plugin "${i.name}" not found`, e);
      }
    }
    this._isLoadingPlugins.next(false);
    this._isLoaded.next(true);
  }
  checkEntries(module: any, config: PluginsInterface) {
    if (!this.loadedPlugins[config.remoteName]) {
      this.loadedPlugins[config.remoteName] = module;
      this.loadedConfigs.push(config);
    }
  }
  buildRoutes(currentPath: string, router: Router) {
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
    console.log('New Routes : ', router.config);
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
}
