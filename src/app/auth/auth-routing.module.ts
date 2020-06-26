import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NbAuthComponent } from '@nebular/auth';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RequestResetPswComponent } from './reset-password/request-reset-psw/request-reset-psw.component';
import { AuthGuard } from '../guards/auth.guard.service';
import { CheckEmailComponent } from './check-email/check-email.component';

export const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },

      {
        path: 'reset-password',
        component: ResetPasswordComponent,

      },
      {
        path: 'check-email',
        component: CheckEmailComponent,

      },
      {
        path: 'request-reset-password',
        component: RequestResetPswComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
