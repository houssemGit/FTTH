import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import {UsersComponent} from './users.component';
import { AjoutUserComponent } from './ajout-user/ajout-user.component';
import { ModifierUserComponent } from './modifier-user/modifier-user.component';
import { GestionUserComponent } from './gestion-user/gestion-user.component';


const routes: Routes = [{
  path: '',
  component: UsersComponent,
  children: [
    {
      path: 'gestion-user',
      component: GestionUserComponent,
    },

    {
      path: 'ajout-user',
      component: AjoutUserComponent,
    },
    {
      path: 'modifier-user',
      component: ModifierUserComponent,
    },


  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {
}
export const routedComponents = [
  UsersComponent,
  AjoutUserComponent,
  ModifierUserComponent,
  GestionUserComponent,
];
