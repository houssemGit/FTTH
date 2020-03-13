import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Router } from "@angular/router";
import * as jwt_decode from "jwt-decode";
import { map } from "rxjs/operators";

import { User } from "../_models/user";
import { UserService } from './user.service';


@Injectable({ providedIn: "root" })
export class AuthService {
  public authorized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {}

  authorize = perf => {
    /*
      this.authorized.next(true);
      const token = perf;
      const payload = jwt_decode(token);
      localStorage.setItem('apiToken', token);
      localStorage.setItem('role', payload.scopes.authority);
      */
    localStorage.setItem("token", perf["token"]);
    let jwtData = perf["token"].split(".")[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData);
    console.log(decodedJwtData.sub);
    this.userService.roleuser(decodedJwtData.sub).subscribe(data=>
       {if (data=="Admin") alert("admin authorisé"); this.router.navigate(["/pages/main/dashboard"]);
       });
       //this.toastService.success('Вы вошли в систему!');

  };

  login(login: string, password: string) {
    return this.http.post("http://localhost:8000/api/login", {login, password});
  }

  public logout() {
    this.authorized.next(false);
    localStorage.clear();
    alert("logged out"); //this.toastService.info('Вы вышли из системы!');
    this.router.navigate(["/login"]);
  }
  resetemail(data) {
    return this.http.post("http://localhost:8000/api/resetemail", data);
  }
}
