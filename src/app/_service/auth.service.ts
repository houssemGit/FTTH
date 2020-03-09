
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
constructor(private http: HttpClient) { }
login(user:User)
{
return this.http.post('http://localhost:8000/api/login',user);
}





}
