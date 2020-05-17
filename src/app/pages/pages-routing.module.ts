import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AjoutCassetteComponent } from './cassette/ajout-cassette/ajout-cassette.component';
import { AjoutSplitterComponent } from './cassette/ajout-splitter/ajout-splitter.component';
import { TableaudebordComponent } from './tableaudebord/tableaudebord.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: TableaudebordComponent,
    },
    {
      path: 'zones/ajout-cassette',
      component: AjoutCassetteComponent,
    },
    {
      path: 'zones/ajout-splitter',
      component: AjoutSplitterComponent,
    },

    {
      path: 'utilisateurs',
      loadChildren: () => import('./users/users.module')
        .then(m => m.UsersModule),
    },
    {
      path: 'zones',
      loadChildren: () => import('./ftth-horizental/ftth-horizental.module')
        .then(m => m.FtthHorizentalModule),
    },
     {
      path: 'immeubles',
      loadChildren: () => import('./ftth-vertical/ftth-vertical.module')
        .then(m => m.FtthVerticalModule),
    },
     {
      path: 'consulter-zones',
      loadChildren: () => import('./ftth-h-consultation/ftth-h-consultation.module')
        .then(m => m.FtthHConsultationModule),
    },
     {
      path: 'consulter-immeubles',
      loadChildren: () => import('./ftth-v-consultation/ftth-v-consultation.module')
        .then(m => m.FtthVConsultationModule),
    },
     {
      path: 'consulter-eligibilite',
      loadChildren: () => import('./ftth-v-consultation/ftth-v-consultation.module')
        .then(m => m.FtthVConsultationModule),
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    {
      path: 'ecommerce-dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
