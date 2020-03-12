import { Component, OnInit,Inject } from "@angular/core";
import { NbLoginComponent, NbAuthService , NB_AUTH_OPTIONS} from "@nebular/auth";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../_service/auth.service";
import { NgForm } from "@angular/forms";

import { ChangeDetectorRef } from "@angular/core";

@Component({
  selector: "ngx-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent extends NbLoginComponent  {


  constructor(
    service: NbAuthService, @Inject(NB_AUTH_OPTIONS) protected options,
    cd: ChangeDetectorRef, router: Router,
    private authService: AuthService

  ) {
    super(service, options, cd, router);
  }


    login(): void {
      this.errors = [];
      this.messages = [];
      this.submitted = true;

      this.authService.login(this.user.email, this.user.password)
        .toPromise()
        .then(res => {
          this.authService.authorize(res);
        })
        .then(() => alert ("login sucess ") )
        .catch(() => alert ("login echoue "));
    }



}
