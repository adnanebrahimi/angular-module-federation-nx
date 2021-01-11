import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeThreeComponent } from './home-three.component';

const routes: Routes = [
  { path: '', component: HomeThreeComponent }
];

@NgModule({
  declarations: [HomeThreeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],

})
export class HomeThreeModule { }
