import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { loadRemoteEntry, loadRemoteModule } from "@angular-architects/module-federation";

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'one', loadChildren: () => loadRemoteModule({
    exposedModule:'./one',
    remoteName:'plugin-one',
    remoteEntry:'http://localhost:3000/remoteEntry.js'
  }).then(m => m.HomeOneModule) },
  { path: 'two', loadChildren: () => loadRemoteModule({
    exposedModule:'./two',
    remoteName:'plugin-two',
    remoteEntry:'http://localhost:3500/remoteEntry.js'
  }).then(m => m.HomeTwoModule) },
  { path: 'three', loadChildren: () => loadRemoteModule({
    exposedModule:'./three',
    remoteName:'three',
    remoteEntry:'http://localhost:5500/remoteEntry.js'
  }).then(m => m.HomeThreeModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
