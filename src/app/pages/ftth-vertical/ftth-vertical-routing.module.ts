import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { FtthVerticalComponent } from './ftth-vertical.component';
import { GererClientComponent } from './gerer-client/gerer-client.component';
import { AjoutClientComponent } from './ajout-client/ajout-client.component';
import { ModifierClientComponent } from './modifier-client/modifier-client.component';
import { ModifierMonositeComponent } from './modifier-monosite/modifier-monosite.component';
import { ModifierAppartementComponent } from './modifier-appartement/modifier-appartement.component';
import { AjoutMonositeComponent } from './ajout-monosite/ajout-monosite.component';
import { AjoutAppartementComponent } from './ajout-appartement/ajout-appartement.component';
import { GererMonositeComponent } from './gerer-monosite/gerer-monosite.component';
import { GererAppartementComponent } from './gerer-appartement/gerer-appartement.component';
import { ConsulterZoneClientComponent } from './consulter-zone-client/consulter-zone-client.component';
import { ConsulterZoneImmeubleMonoApartComponent } from './consulter-zone-immeuble-mono-apart/consulter-zone-immeuble-mono-apart.component';




const routes: Routes = [{
  path: '',
  component: FtthVerticalComponent,
  children: [
    {
      path: 'gerer-client',
      component: GererClientComponent ,
    },

    {
      path: 'gerer-appartement',
      component:GererAppartementComponent ,
    },
    {
      path: 'gerer-monosite',
      component: GererMonositeComponent,
    },
    {
      path: 'ajout-client',
      component: AjoutClientComponent ,
    },
    {
      path: 'ajout-appartement',
      component: AjoutAppartementComponent,
    },
    {
      path: 'ajout-monosite',
      component: AjoutMonositeComponent,
    },
    {
      path: 'modifier-client',
      component: ModifierClientComponent ,
    },
    {
      path: 'modifier-appartement',
      component: ModifierAppartementComponent ,
    },
    {
      path: 'modifier-monosite',
      component: ModifierMonositeComponent,
    },
    {
      path: 'consulter-zone-client',
      component: ConsulterZoneClientComponent,
    },
    {
      path: 'consulter-zone-immeuble-mono-apart',
      component: ConsulterZoneImmeubleMonoApartComponent,
    },



  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FtthVerticalRoutingModule {
}
export const routedComponents = [
  FtthVerticalComponent,
  GererClientComponent,
  AjoutClientComponent,
  ModifierClientComponent,
  ModifierMonositeComponent,
  ModifierAppartementComponent,
  AjoutMonositeComponent,
  AjoutAppartementComponent,
  GererMonositeComponent,
  GererAppartementComponent,
  ConsulterZoneClientComponent,
  ConsulterZoneImmeubleMonoApartComponent
];
