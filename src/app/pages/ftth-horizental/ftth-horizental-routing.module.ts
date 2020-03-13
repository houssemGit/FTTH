import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { FtthHorizentalComponent } from './ftth-horizental.component';
import { GererOltComponent } from './gerer-olt/gerer-olt.component';
import { GererSroComponent } from './gerer-sro/gerer-sro.component';
import { AjoutOltComponent } from './ajout-olt/ajout-olt.component';
import { AjoutSroComponent } from './ajout-sro/ajout-sro.component';
import { ModifierOltComponent } from './modifier-olt/modifier-olt.component';
import { ModifierSroComponent } from './modifier-sro/modifier-sro.component';



const routes: Routes = [{
  path: '',
  component: FtthHorizentalComponent,
  children: [
    {
      path: 'gerer-olt',
      component: GererOltComponent,
    },

    {
      path: 'gerer-sro',
      component: GererSroComponent,
    },
    {
      path: 'ajout-olt',
      component: AjoutOltComponent,
    },
    {
      path: 'ajout-sro',
      component: AjoutSroComponent,
    },
    {
      path: 'modifier-olt',
      component: ModifierOltComponent,
    },
    {
      path: 'modifier-sro',
      component: ModifierSroComponent,
    },


  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FtthHorizentalRoutingModule {
}
export const routedComponents = [
  FtthHorizentalComponent,
  GererOltComponent,
  GererSroComponent,
  AjoutOltComponent,
  AjoutSroComponent,
  ModifierOltComponent,
  ModifierSroComponent



];
