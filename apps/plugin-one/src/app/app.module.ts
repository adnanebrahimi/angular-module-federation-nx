import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./features/home-one/home-one.module').then(m => m.HomeOneModule)
      }]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
