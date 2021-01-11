import { Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { PluginResolverService } from '@cac-pos/plugin-loader';

@Component({
  selector: 'cac-pos-plugin',
  templateUrl: './plugin.component.html',
  // styleUrls: ['./plugin.component.scss']
})
export class PluginComponent{
  @Input() name!: string;
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
  constructor(public pluginResolver: PluginResolverService, private factory: ComponentFactoryResolver) {
    pluginResolver.isLoaded.subscribe((e) => {
      if (e) {
        const component = this.pluginResolver.getComponent(this.name);
        this.container.clear();
        console.log(component);
        const compFactory = this.factory.resolveComponentFactory(component);
        this.container.createComponent(compFactory);
      }
    });
  }
}
