import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule),
  },
  // {
  //   path: 'one',
  //   loadChildren: () => import('one/Module').then((m) => m.HomeOneModule),
  // },
  // {
  //   path: 'two',
  //   loadChildren: () => import('two/Module').then((m) => m.HomeTwoModule),
  // },
  // {
  //   path: 'three',
  //   loadChildren: () => import('three/Module').then((m) => m.HomeThreeModule),
  // },
  {
    path: 'one',
    loadChildren: () =>
      loadRemoteModule({
        exposedModule: './Module',
        remoteName: 'one',
        remoteEntry:'http://localhost:3000/remoteEntry.js'
      }).then((m) => m.HomeOneModule),
  },
  {
    path: 'two',
    loadChildren: () =>
      loadRemoteModule({
        exposedModule: './Module',
        remoteName: 'two',
        remoteEntry:'http://localhost:3500/remoteEntry.js'
      }).then((m) => m.HomeTwoModule),
  },
  {
    path: 'three',
    loadChildren: () =>
      loadRemoteModule({
        exposedModule: './Module',
        remoteName: 'three',
        remoteEntry:'http://localhost:5500/remoteEntry.js'
      }).then((m) => m.HomeThreeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
