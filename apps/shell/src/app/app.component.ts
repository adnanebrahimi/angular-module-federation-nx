import { Component, OnInit } from '@angular/core';
import { PluginResolverService } from './core/services/plugin-resolver.service';

@Component({
  selector: 'cac-pos-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(private pluginResolver: PluginResolverService) {
  }
  ngOnInit() {
    this.pluginResolver.loadPlugins();
  }
}
