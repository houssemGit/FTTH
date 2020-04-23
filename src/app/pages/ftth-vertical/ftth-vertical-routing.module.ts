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
import { GererPriComponent } from './gerer-pri/gerer-pri.component';
import { AjoutPriComponent } from './ajout-pri/ajout-pri.component';
import { ModifierPriComponent } from './modifier-pri/modifier-pri.component';
import { ConsulterZonePriComponent } from './consulter-zone-pri/consulter-zone-pri.component';




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
      path: 'gerer-pri',
      component: GererPriComponent,
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
      path: 'ajout-pri',
      component: AjoutPriComponent,
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
      path: 'modifier-pri',
      component: ModifierPriComponent,
    },
    {
      path: 'consulter-zone-client',
      component: ConsulterZoneClientComponent,
    },
    {
      path: 'consulter-zone-immeuble-mono-apart',
      component: ConsulterZoneImmeubleMonoApartComponent,
    },
    {
      path: 'consulter-zone-pri',
      component: ConsulterZonePriComponent,
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
  ConsulterZoneImmeubleMonoApartComponent,
  GererPriComponent,
  AjoutPriComponent,
  ModifierPriComponent,
  ConsulterZonePriComponent
];
