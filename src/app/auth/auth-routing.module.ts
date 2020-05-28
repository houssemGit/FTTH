import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NbAuthComponent } from '@nebular/auth';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RequestResetPswComponent } from './reset-password/request-reset-psw/request-reset-psw.component';
import { AuthGuard } from '../guards/auth.guard.service';

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
        canActivate : [AuthGuard]

      },
      {
        path: 'request-reset-password',
        component: RequestResetPswComponent,
        canActivate : [AuthGuard]

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
