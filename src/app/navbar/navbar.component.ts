import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  loggedIn = false;
  toolTip = false;

  constructor(private userSvc: UserService) { }

  ngOnInit() {
    this.userSvc.loggedin.subscribe((val) => {
      this.loggedIn = val;
    });
  }

}
