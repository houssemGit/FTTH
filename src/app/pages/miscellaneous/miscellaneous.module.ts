import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { MiscellaneousRoutingModule } from './miscellaneous-routing.module';
import { MiscellaneousComponent } from './miscellaneous.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotAuthComponent } from './not-auth/not-auth/not-auth.component';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    MiscellaneousRoutingModule,
  ],
  declarations: [
    MiscellaneousComponent,
    NotFoundComponent,
    NotAuthComponent,
  ],
})
export class MiscellaneousModule { }
