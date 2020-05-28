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
    localStorage.clear();
  }


    login(): void {
      this.errors = [];
      this.messages = [];
      this.submitted = true;

      this.authService.login(this.user).subscribe(data=> {
        localStorage.setItem('token',data['token']);
        let jwtData = data['token'].split('.')[1]
        let decodedJwtJsonData = window.atob(jwtData)
        let decodedJwtData = JSON.parse(decodedJwtJsonData)
        this.authService.getUserById(decodedJwtData.sub).subscribe(data => {
        localStorage.setItem('role',data.Role);
        localStorage.setItem('username',data.Nom+' '+data.Prenom);
        this.router.navigateByUrl('/pages/dashboard')})
  });

      // this.authService.login(this.user)
      //   .toPromise()
      //   .then(res => {
      //     this.authService.authorize(res);
      //   })
      //   .then(() => alert ("login sucess ") )
      //   .catch(() => alert ("login echoue "));
    }



}
