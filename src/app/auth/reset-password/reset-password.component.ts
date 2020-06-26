/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService, NB_AUTH_OPTIONS, NbResetPasswordComponent } from '@nebular/auth';
import { AuthService } from '../../_service/auth.service';
import { User } from '../../_models/user';
import { NbGlobalPhysicalPosition, NbComponentStatus, NbToastrService } from '@nebular/theme';


@Component({
  selector: 'nb-reset-password-page',
  styleUrls: ['./reset-password.component.scss'],
  templateUrl: './reset-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent extends NbResetPasswordComponent {

  constructor(
    service: NbAuthService, @Inject(NB_AUTH_OPTIONS) protected options,
    cd: ChangeDetectorRef, router: Router,
    private authService: AuthService,
    private toastrService: NbToastrService

  ) {
    super(service, options, cd, router);
  }

  pswemail= new User
  status: NbComponentStatus ;


  resetPass(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    //console.log(localStorage.getItem('Email'));

    if (localStorage.getItem('Email'))
    {this.pswemail.Email=localStorage.getItem('Email')}
    else this.pswemail.Email=localStorage.getItem('mail')
    this.pswemail.Password=this.user.confirmPassword


    //console.log(this.pswemail);

     this.authService.reset_psw(this.pswemail).subscribe(data =>{
      if (localStorage.getItem('Email')){
        this.router.navigateByUrl('/pages/dashboard');
        this.status="success"
       this.toastrService.show(``,`Mot de passe réinitialisé avec succès.`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
      }else {
        this.router.navigateByUrl('/auth/login');
        this.status="success"
       this.toastrService.show(``,`Mot de passe réinitialisé avec succès.`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
      }

      },(error) => {alert ("send echoue ")})


  }


}

