import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { FtthHConsultationComponent } from './ftth-h-consultation.component';
import { ConsulterZoneComponent } from './consulter-zone/consulter-zone.component';
import { DetailsZoneComponent } from './details-zone/details-zone.component';




const routes: Routes = [{
  path: '',
  component: FtthHConsultationComponent,
  children: [
    {
      path: 'zones',
      component: ConsulterZoneComponent,
    },

    {
      path: 'details',
      component: DetailsZoneComponent,
    },


  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FtthHConsultationRoutingModule {
}
export const routedComponents = [
  FtthHConsultationComponent,
  ConsulterZoneComponent,
  DetailsZoneComponent
];
