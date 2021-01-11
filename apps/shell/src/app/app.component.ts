import { Component, OnInit } from '@angular/core';
import { PluginResolverService } from '@cac-pos/plugin-loader';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'cac-pos-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(private pluginResolver: PluginResolverService, private router: Router) {
  }
  ngOnInit() {
    this.pluginResolver.loadPlugins({
      production: environment.production,
      router: this.router,
      routePath: 'plugins'
    });
  }
}
