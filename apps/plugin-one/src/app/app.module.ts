import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
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
