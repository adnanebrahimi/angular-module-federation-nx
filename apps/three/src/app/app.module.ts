import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeThreeModule } from './features/home-three/home-three.module';

@NgModule({
  declarations: [AppComponent],
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
    HomeThreeModule
  ]
})
export class AppModule {}
