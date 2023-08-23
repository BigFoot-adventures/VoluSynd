import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  loggedIn = false;
  admin = false;
  toolTip = false;

  constructor(private userSvc: UserService) { }
  
  ngOnInit() {
    this.userSvc.loggedin.subscribe((val) => {
      this.loggedIn = val;
      this.admin = this.userSvc.userObj?.role === 'admin';
    });
    this.loggedIn = this.userSvc.userToken ? true : false;
    this.admin = this.userSvc.userObj?.role === 'admin';
  }

  logout() {
    this.userSvc.logout();
  }

}
