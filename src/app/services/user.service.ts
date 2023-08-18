import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { token } from '../models/token';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  userToken: token | undefined;
  userObj: any;
  @Output() loggedin = new EventEmitter<boolean>();

  constructor(private client:HttpClient, public router: Router) {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr) {
      this.userToken = tokenStr?JSON.parse(tokenStr):null;
      if (this.userToken) {
        let decoded = jwt_decode(this.userToken.token) as any;
        this.userObj = decoded.data;
      }
      this.loggedin.emit(true);
    } else {
      this.userToken = undefined;
      this.loggedin.emit(false);
    }
  }

  login(userName: string, password: string) { 
    return this.client.post<token>(`${environment.serverEndpoint}/users/login`, { userName: userName, password: password })
  }

  logout() {
    this.userToken = undefined;
    this.loggedin.emit(false);
    localStorage.removeItem('token');
  }

  getCurUser() {
    return this.client.get<object>(`${environment.serverEndpoint}/users/${this.userToken}`, { headers: { 'Authorization': `Bearer ${this.userToken}` } });
  }

  setCurUser(token: token) {
    this.userToken = token;
  }


}
