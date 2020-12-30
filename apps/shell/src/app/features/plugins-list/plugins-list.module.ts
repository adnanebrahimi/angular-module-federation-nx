import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluginsListComponent } from './plugins-list.component';
import { PluginsListRoutingModule } from './plugins-list-routing.module';



@NgModule({
  declarations: [PluginsListComponent],
  imports: [
    CommonModule,
    PluginsListRoutingModule
  ]
})
export class PluginsListModule { }
