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


  login(user : User) {
    return this.http.post("http://localhost:8000/api/login", user);
  }
  getUserRoleById(id:number){
     return this.http.get("http://localhost:8000/api/users/role/"+id.toString());
  }
  getUserById(id:number){
     return this.http.get<User>("http://localhost:8000/api/users/user/"+id.toString());
  }

  getRole(){
    return localStorage.getItem('role');
  }
  checkAvailability(): boolean {
    //return !!localStorage.getItem('token') && !!localStorage.getItem('role') && !!localStorage.getItem('username') ;
    return true ;
  }

  public logout() {
    this.authorized.next(false);
    localStorage.clear();
    alert("logged out"); //this.toastService.info('Вы вышли из системы!');
    this.router.navigate(["/login"]);
  }
  reset_psw_email(ch:any) {
    return this.http.post("http://localhost:8000/api/users/forgot/"+ch,ch);
  }
  reset_psw(data) {
    return this.http.post("http://localhost:8000/api/users/reset", data);
  }
}
