import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbIconModule,
  NbCardModule,
} from '@nebular/theme';




import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RequestResetPswComponent } from './reset-password/request-reset-psw/request-reset-psw.component';

@NgModule({
  declarations: [
  LoginComponent,
  ResetPasswordComponent,
  RequestResetPswComponent,
],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    RouterModule,
    AuthRoutingModule,
    NbAuthModule,

    NbAlertModule,
    NbButtonModule,
    NbCheckboxModule,
    NbInputModule,
    NbIconModule,
    NbCardModule,


  ]
})
export class AuthModule { }
