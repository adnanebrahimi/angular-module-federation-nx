import { Component, OnInit } from '@angular/core';
import { PluginResolverService } from '@cac-pos/plugin-loader';
import { Router } from '@angular/router';

@Component({
  selector: 'cac-pos-plugins-list',
  templateUrl: './plugins-list.component.html',
  // styleUrls: ['./plugins-list.component.scss']
})
export class PluginsListComponent implements OnInit {
  constructor(public pluginResolver: PluginResolverService, private router: Router) {
    pluginResolver.isLoaded.subscribe(v => {
      if (v) {
        pluginResolver.buildRoutes('plugins', router);
      }
    });
  }

  ngOnInit(): void {

  }

}
