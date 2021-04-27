import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Options
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http:HttpClient) { }

  // register the user
  registerUser(user: User): Observable<User>{
    return this.http.post<User>(`${environment.baseUrlAPI}/users/register`, user, this.httpOptions);
  }
  getAllUsers(){
      return this.http.post<User[]>(`${environment.baseUrlAPI}/users/`,this.httpOptions);
  }
  deleteUser(uname: String):Observable<User>{
      const user = {uname:uname};
      return this.http.post<User>(`${environment.baseUrlAPI}/users/delete`,user, this.httpOptions);
  }
}
