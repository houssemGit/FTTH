import { NgModule } from '@angular/core';
import { NbMenuModule, NbListModule, NbPopoverModule, NbButtonModule, NbSelectModule,NbIconModule } from '@nebular/theme';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NbAccordionModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import {NbCardModule} from '@nebular/theme';



import { NgxEchartsModule } from 'ngx-echarts';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ChartModule } from 'angular2-chartjs';



import { PagesComponent } from './pages.component';
import { AjoutCassetteComponent } from './cassette/ajout-cassette/ajout-cassette.component';
import { AjoutSplitterComponent } from './cassette/ajout-splitter/ajout-splitter.component';
import { TableaudebordComponent } from './tableaudebord/tableaudebord.component';
import { ChartjsBarHorizontalComponent } from './tableaudebord/bar-horiz-chartjs.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableaudebordZoneResidenceComponent } from './tableaudebord-zone-residence/tableaudebord-zone-residence.component';

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
    NbPopoverModule,
    NbButtonModule,
    NbSelectModule,
    NgbModule,
    NbIconModule,

        ThemeModule,

    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,

  ],
  declarations: [
    PagesComponent,
    AjoutCassetteComponent,
    AjoutSplitterComponent,
    TableaudebordComponent,
    ChartjsBarHorizontalComponent,
    TableaudebordZoneResidenceComponent,

  ],

})
export class PagesModule {
}
