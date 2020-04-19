import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsResidenceComponent } from './details-residence/details-residence.component';
import { ConsulterResidenceComponent } from './consulter-residence/consulter-residence.component';
import { ConsulterZoneResidenceComponent } from './consulter-zone-residence/consulter-zone-residence.component';
import { ConsulterZoneImmeubleComponent } from './consulter-zone-immeuble/consulter-zone-immeuble.component';
import { DetailsImmeubleComponent } from './details-immeuble/details-immeuble.component';
import { HttpClientModule } from '@angular/common/http';
import { FtthVConsultationRoutingModule,routedComponents } from './ftth-v-consultation-routing.module';
import { NbAccordionModule, NbPopoverModule, NbButtonModule, NbIconModule, NbCardModule, NbListModule } from '@nebular/theme';

@NgModule({
  declarations: [routedComponents, DetailsResidenceComponent, ConsulterResidenceComponent, ConsulterZoneResidenceComponent, ConsulterZoneImmeubleComponent, DetailsImmeubleComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FtthVConsultationRoutingModule,
    NbAccordionModule,
    NbPopoverModule,
    NbButtonModule,
    NbIconModule,
    NbCardModule,
    NbListModule,
  ]
})
export class FtthVConsultationModule { }
