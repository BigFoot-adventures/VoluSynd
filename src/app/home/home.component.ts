import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loggedIn = false;

  constructor(private userSvc: UserService) {
    this.loggedIn = userSvc.userToken ? true : false;
    console.log(this.loggedIn);
  }

}
