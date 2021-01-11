import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  Input,
  OnDestroy,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { PluginResolverService } from '@cac-pos/plugin-loader';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cac-pos-plugin',
  templateUrl: './plugin.component.html',
  // styleUrls: ['./plugin.component.scss']
})
export class PluginComponent implements OnDestroy, AfterViewInit{
  @Input() name!: string;
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
  subs: Subscription = new Subscription();
  constructor(public pluginResolver: PluginResolverService, private factory: ComponentFactoryResolver) {
  }
  ngAfterViewInit() {
    if (!this.pluginResolver.isLoaded.getValue()) {
      const s = this.pluginResolver.isLoaded
        .subscribe((e) => {
        if (e) {
          this.loadComponent();
        }
      });
      this.subs.add(s);
    } else {
      this.loadComponent();
    }
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  loadComponent() {
    const component = this.pluginResolver.getComponent(this.name);
    if (!component) {
      console.error(`Component : "${this.name}" not found.`);
      return;
    }
    this.container.clear();
    const compFactory = this.factory.resolveComponentFactory(component);
    this.container.createComponent(compFactory);
  }

}
