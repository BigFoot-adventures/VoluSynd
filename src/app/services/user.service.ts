import { Injectable } from '@angular/core';
import { user } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { token } from '../models/token';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  userToken: token | undefined;
  userObj: user | undefined;

  constructor(private client:HttpClient) {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr) {
      this.userToken = JSON.parse(tokenStr);
    }
  }

  login(userName: string, password: string) { 
    return this.client.post<token>(`${environment.serverEndpoint}/users/login`, { userName: userName, password: password })
  }

  getCurUser() {
    return this.userObj;
  }

  setCurUser(token: token) {
    this.userToken = token;
  }


}
