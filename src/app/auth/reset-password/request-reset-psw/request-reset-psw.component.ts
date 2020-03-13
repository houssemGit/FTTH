


import { Component, OnInit,Inject } from "@angular/core";
import { NbLoginComponent, NbAuthService , NB_AUTH_OPTIONS} from "@nebular/auth";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../_service/auth.service";
import { NgForm } from "@angular/forms";

import { ChangeDetectorRef } from "@angular/core";

@Component({
  selector: 'ngx-request-reset-psw',
  templateUrl: './request-reset-psw.component.html',
  styleUrls: ['./request-reset-psw.component.scss']
})
export class RequestResetPswComponent extends NbLoginComponent  {


  constructor(
    service: NbAuthService, @Inject(NB_AUTH_OPTIONS) protected options,
    cd: ChangeDetectorRef, router: Router,
    private authService: AuthService

  ) {
    super(service, options, cd, router);
  }


    envoyer(): void {
      this.errors = [];
      this.messages = [];
      this.submitted = true;

      this.authService.resetemail(this.user.email).subscribe(data =>alert ("send sucess "),(error) => alert ("send echoue "))

    }



}
