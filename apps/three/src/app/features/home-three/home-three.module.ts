import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeThreeComponent } from './home-three.component';
import { NewsComponentComponent } from './news-component/news-component.component';

const routes: Routes = [
  { path: '', component: HomeThreeComponent }
];

@NgModule({
  declarations: [HomeThreeComponent, NewsComponentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [NewsComponentComponent]

})
export class HomeThreeModule { }
