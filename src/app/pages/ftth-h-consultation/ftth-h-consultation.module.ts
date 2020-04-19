import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsZoneComponent } from './details-zone/details-zone.component';
import { ConsulterZoneComponent } from './consulter-zone/consulter-zone.component';
import { HttpClientModule } from '@angular/common/http';
import { FtthHConsultationRoutingModule,routedComponents } from './ftth-h-consultation-routing.module';
import { NbAccordionModule, NbPopoverModule, NbButtonModule, NbIconModule, NbCardModule, NbListModule } from '@nebular/theme';

@NgModule({
  declarations: [DetailsZoneComponent, ConsulterZoneComponent,routedComponents],
  imports: [
    CommonModule,
    HttpClientModule,
    FtthHConsultationRoutingModule,
    NbAccordionModule,
    NbPopoverModule,
    NbButtonModule,
    NbIconModule,
    NbCardModule,
    NbListModule,

  ]
})
export class FtthHConsultationModule { }
