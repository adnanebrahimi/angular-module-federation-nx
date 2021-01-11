import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeTwoComponent } from './home-two.component';
import { PluginLoaderModule } from '@cac-pos/plugin-loader';


const routes: Routes = [
  { path: '', component: HomeTwoComponent }
];

@NgModule({
  declarations: [HomeTwoComponent],
  imports: [
    CommonModule,
    PluginLoaderModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeTwoModule { }
