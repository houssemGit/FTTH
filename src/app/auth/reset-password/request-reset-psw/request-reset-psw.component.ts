


import { Component, OnInit,Inject } from "@angular/core";
import {  NbAuthService , NB_AUTH_OPTIONS, NbRequestPasswordComponent} from "@nebular/auth";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../_service/auth.service";
import { NgForm } from "@angular/forms";

import { ChangeDetectorRef } from "@angular/core";
import { NbGlobalPhysicalPosition, NbComponentStatus, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-request-reset-psw',
  templateUrl: './request-reset-psw.component.html',
  styleUrls: ['./request-reset-psw.component.scss']
})
export class RequestResetPswComponent extends NbRequestPasswordComponent  {


  constructor(
    service: NbAuthService, @Inject(NB_AUTH_OPTIONS) protected options,
    cd: ChangeDetectorRef, router: Router,
    private authService: AuthService,
    private toastrService: NbToastrService


  ) {
    super(service, options, cd, router);
  }
  status: NbComponentStatus ;
  ch: string

    envoyer(): void {
      this.errors = [];
      this.messages = [];
      this.submitted = true;
      this.ch= this.user.email
      this.authService.reset_psw_email(this.ch).subscribe(data =>{
      this.status="success"
      this.toastrService.show(``,`Email envoyer avec succès!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
      localStorage.setItem('mail',this.user.email)
      this.router.navigateByUrl("auth/check-email");
      },(error) =>{
        this.status="danger"
        this.toastrService.show(``,`Pas d'utilisateur avec cet email!!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});


    })
  }


}
