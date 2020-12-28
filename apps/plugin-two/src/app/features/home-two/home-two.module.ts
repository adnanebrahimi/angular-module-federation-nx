import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeTwoComponent } from './home-two.component';


const routes: Routes = [
  { path: '', component: HomeTwoComponent }
];

@NgModule({
  declarations: [HomeTwoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeTwoModule { }
