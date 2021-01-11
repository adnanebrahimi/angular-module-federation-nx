import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NewsComponentComponent } from './features/home-three/news-component/news-component.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent, NewsComponentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./features/home-three/home-three.module').then(m => m.HomeThreeModule)
      }]),
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    NewsComponentComponent
  ]
})
export class AppModule {}
