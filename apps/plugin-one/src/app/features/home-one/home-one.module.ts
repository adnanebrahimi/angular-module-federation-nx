import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeOneComponent } from './home-one.component';


const routes: Routes = [
  { path: '', component: HomeOneComponent }
];

@NgModule({
  declarations: [HomeOneComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeOneModule { }
