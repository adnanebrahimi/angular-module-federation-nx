import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forChild([
      { path: '',
        loadChildren: () => import('./features/home-two/home-two.module').then(m => m.HomeTwoModule)
      }]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
