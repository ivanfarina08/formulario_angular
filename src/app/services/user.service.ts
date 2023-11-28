import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({'content-type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  BASE_URL:string='http://localhost:3000/';

  constructor(private http:HttpClient) { }

  getUsers(): Observable<User[]>{
    let url:string = this.BASE_URL + 'users';
    return this.http.get<User[]>(url);
  }

  addUsers(user:any): Observable<User>{
    let url:string = this.BASE_URL + 'users';
    return this.http.post<User>(url, user, httpOptions);
  }

  editUsers(user:any): Observable<User>{
    let url:string = this.BASE_URL + 'users/' + user.id;
    return this.http.post<User>(url, user, httpOptions);
  }

  deleteUsers(user:any): Observable<User>{
    let url:string = this.BASE_URL + 'users/' + user.id;
    return this.http.post<User>(url, user, httpOptions);
  }
}
