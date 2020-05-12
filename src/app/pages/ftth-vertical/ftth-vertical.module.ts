import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GererClientComponent } from './gerer-client/gerer-client.component';
import { AjoutClientComponent } from './ajout-client/ajout-client.component';
import { ModifierClientComponent } from './modifier-client/modifier-client.component';
import { GererAppartementComponent } from './gerer-appartement/gerer-appartement.component';
import { AjoutAppartementComponent } from './ajout-appartement/ajout-appartement.component';
import { ModifierAppartementComponent } from './modifier-appartement/modifier-appartement.component';
import { ModifierMonositeComponent } from './modifier-monosite/modifier-monosite.component';
import { AjoutMonositeComponent } from './ajout-monosite/ajout-monosite.component';
import { GererMonositeComponent } from './gerer-monosite/gerer-monosite.component';
import { ConsulterZoneClientComponent } from './consulter-zone-client/consulter-zone-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NbAccordionModule, NbPopoverModule, NbButtonModule, NbIconModule, NbCardModule, NbListModule } from '@nebular/theme';
import { FtthVerticalRoutingModule, routedComponents } from './ftth-vertical-routing.module';
import { GererPriComponent } from './gerer-pri/gerer-pri.component';
import { AjoutPriComponent } from './ajout-pri/ajout-pri.component';
import { ModifierPriComponent } from './modifier-pri/modifier-pri.component';
import { ConsulterZonePriComponent } from './consulter-zone-pri/consulter-zone-pri.component';
import { DataTablesModule } from 'angular-datatables';
import { ConsulterZoneMonoComponent } from './consulter-zone-mono/consulter-zone-mono.component';
import { ConsulterZoneApartComponent } from './consulter-zone-apart/consulter-zone-apart.component';
import { ConsulterResidenceApartComponent } from './consulter-residence-apart/consulter-residence-apart.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConsulterImmeubleClientComponent } from './consulter-immeuble-client/consulter-immeuble-client.component';
import { GererClientResComponent } from './gerer-client-res/gerer-client-res.component';

@NgModule({
  declarations: [ConsulterZoneApartComponent,ConsulterZoneMonoComponent,routedComponents,GererClientComponent, AjoutClientComponent, ModifierClientComponent, GererAppartementComponent, AjoutAppartementComponent, ModifierAppartementComponent, ModifierMonositeComponent, AjoutMonositeComponent, GererMonositeComponent, ConsulterZoneClientComponent, GererPriComponent, AjoutPriComponent, ModifierPriComponent, ConsulterZonePriComponent, ConsulterResidenceApartComponent, ConsulterImmeubleClientComponent, GererClientResComponent],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FtthVerticalRoutingModule,
    NbAccordionModule,
    NbPopoverModule,
    NbButtonModule,
    NbIconModule,
    NbCardModule,
    NbListModule,
    DataTablesModule,
    NgbModule,

  ]
})
export class FtthVerticalModule { }
