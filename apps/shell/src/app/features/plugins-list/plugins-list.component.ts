import { Component, OnInit } from '@angular/core';
import { PluginResolverService } from '@cac-pos/plugin-loader';

@Component({
  selector: 'cac-pos-plugins-list',
  templateUrl: './plugins-list.component.html',
  // styleUrls: ['./plugins-list.component.scss']
})
export class PluginsListComponent implements OnInit {
  constructor(public pluginResolver: PluginResolverService) {}

  ngOnInit(): void {}

}
