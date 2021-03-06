import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AddPageModule } from './add/add.module';
import { AddPage } from './add/add.page';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    // on dit qu'à l'écriture de 'add' on accède à /add
    path: 'add',
    component: AddPage,
    loadChildren: () => import('./add/add.module').then( m => m.AddPageModule)
  },
];

@NgModule({
  imports: [
    // méthode statique pour les modules custome : routermodule : approutingmodule
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }), AddPageModule 
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }