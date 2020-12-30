import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PluginsListComponent } from './plugins-list.component';

const routes: Routes = [{ path: '', component: PluginsListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PluginsListRoutingModule { }
