

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {Router} from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { map } from 'rxjs/operators';

import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public authorized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router)
     {}

     authorize = (perf) => {
      this.authorized.next(true);
      const token = perf;
      const payload = jwt_decode(token);
      localStorage.setItem('apiToken', token);
      localStorage.setItem('role', payload.scopes.authority);
      alert("user authorisé");//this.toastService.success('Вы вошли в систему!');
      this.router.navigate(['/pages/main/dashboard']);
    }

  login(login: string, password: string) {
    return this.http.post('http://localhost:8000/api/login', {login, password});
  }

  public logout() {
    this.authorized.next(false);
    localStorage.clear();
    alert("logged out") //this.toastService.info('Вы вышли из системы!');
    this.router.navigate(['/login']);
  }
}
