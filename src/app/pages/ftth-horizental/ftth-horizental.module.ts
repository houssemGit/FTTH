import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FtthHorizentalRoutingModule, routedComponents } from './ftth-horizental-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NbAccordionModule, NbPopoverModule,  NbButtonModule,     NbIconModule,

} from '@nebular/theme';





//components
import { AjoutOltComponent } from './ajout-olt/ajout-olt.component';
import { AjoutSroComponent } from './ajout-sro/ajout-sro.component';
import { ModifierSroComponent } from './modifier-sro/modifier-sro.component';
import { ModifierOltComponent } from './modifier-olt/modifier-olt.component';
import { GererOltComponent } from './gerer-olt/gerer-olt.component';
import { GererSroComponent } from './gerer-sro/gerer-sro.component';




@NgModule({
  declarations: [AjoutOltComponent, AjoutSroComponent, ModifierSroComponent, ModifierOltComponent, GererOltComponent, GererSroComponent,routedComponents],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FtthHorizentalRoutingModule,
    NbAccordionModule,
    NgbModule,
    NbPopoverModule,
    NbButtonModule,
    NbIconModule,



  ]
})
export class FtthHorizentalModule { }
