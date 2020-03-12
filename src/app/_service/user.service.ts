import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../_models/user";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}
  user1: User;
  allusers(){
    return this.http.get("http://localhost:8000/api/users");

  }
  adduser(user: any) {
    this.user1 = new User();

    return this.http.post("http://localhost:8000/api/users", user);
  }
  modifyuser(user: any, id:string) {
    return this.http.put("http://localhost:8000/api/users/"+id, user);
  }

  deleteuser(id: string) {
    return this.http.delete("http://localhost:8000/api/users/"+ id);
  }
}
