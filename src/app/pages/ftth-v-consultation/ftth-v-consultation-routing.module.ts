import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { FtthVConsultationComponent } from './ftth-v-consultation.component';
import { ConsulterResidenceComponent } from './consulter-residence/consulter-residence.component';
import { ConsulterZoneImmeubleComponent } from './consulter-zone-immeuble/consulter-zone-immeuble.component';
import { ConsulterZoneResidenceComponent } from './consulter-zone-residence/consulter-zone-residence.component';
import { DetailsResidenceComponent } from './details-residence/details-residence.component';
import { DetailsImmeubleComponent } from './details-immeuble/details-immeuble.component';
import { ConsulterZoneEligibiliteComponent } from './consulter-zone-eligibilite/consulter-zone-eligibilite.component';
import { DetailsEligibiliteComponent } from './details-eligibilite/details-eligibilite.component';





const routes: Routes = [{
  path: '',
  component: FtthVConsultationComponent,
  children: [
    {
      path: 'consulter-residence',
      component: ConsulterResidenceComponent  ,
    },

    {
      path: 'consulter-zone-immeuble',
      component: ConsulterZoneImmeubleComponent,
    },
    {
      path: 'consulter-zone-residence',
      component: ConsulterZoneResidenceComponent,
    },
    {
      path: 'consulter-zone-eligibilite',
      component: ConsulterZoneEligibiliteComponent,
    },
    {
      path: 'details-immeuble',
      component: DetailsImmeubleComponent ,
    },
    {
      path: 'details-residence',
      component: DetailsResidenceComponent ,
    },
    {
      path: 'details-eligibilite',
      component: DetailsEligibiliteComponent ,
    },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FtthVConsultationRoutingModule {
}
export const routedComponents = [
  FtthVConsultationComponent,
  ConsulterResidenceComponent,
  ConsulterZoneImmeubleComponent,
  ConsulterZoneResidenceComponent,
  ConsulterZoneEligibiliteComponent,
  DetailsImmeubleComponent,
  DetailsResidenceComponent,
  DetailsEligibiliteComponent
];
