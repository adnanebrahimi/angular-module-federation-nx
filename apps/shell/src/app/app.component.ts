import { Component, OnInit } from '@angular/core';
import { PluginResolverService } from '@cac-pos/plugin-loader';
import { environment } from '../environments/environment';

@Component({
  selector: 'cac-pos-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(private pluginResolver: PluginResolverService) {
  }
  ngOnInit() {
    this.pluginResolver.loadPlugins(environment.production);
  }
}
