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
import { ConsulterZoneImmeubleMonoApartComponent } from './consulter-zone-immeuble-mono-apart/consulter-zone-immeuble-mono-apart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NbAccordionModule, NbPopoverModule, NbButtonModule, NbIconModule } from '@nebular/theme';
import { FtthVerticalRoutingModule, routedComponents } from './ftth-vertical-routing.module';

@NgModule({
  declarations: [routedComponents,GererClientComponent, AjoutClientComponent, ModifierClientComponent, GererAppartementComponent, AjoutAppartementComponent, ModifierAppartementComponent, ModifierMonositeComponent, AjoutMonositeComponent, GererMonositeComponent, ConsulterZoneClientComponent, ConsulterZoneImmeubleMonoApartComponent],
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
  ]
})
export class FtthVerticalModule { }
