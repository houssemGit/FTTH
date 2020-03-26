import { NgModule } from '@angular/core';
import { NbMenuModule, NbListModule } from '@nebular/theme';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NbAccordionModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import {NbCardModule} from '@nebular/theme';


import { PagesComponent } from './pages.component';
import { AjoutCassetteComponent } from './cassette/ajout-cassette/ajout-cassette.component';
import { AjoutSplitterComponent } from './cassette/ajout-splitter/ajout-splitter.component';
import { ConsulterZoneComponent } from './consulter-zone/consulter-zone.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    NbAccordionModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    NbListModule,

  ],
  declarations: [
    PagesComponent,
    AjoutCassetteComponent,
    AjoutSplitterComponent,
    ConsulterZoneComponent,

  ],
})
export class PagesModule {
}
