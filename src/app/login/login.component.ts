import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  fg = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private userSvc: UserService, private router: Router) { }

  login() {
    let userName = this.fg.get('userName')?.value;
    let password = this.fg.get('password')?.value;
    if (userName && password) {
      if (this.fg.valid) {
        this.userSvc.login(userName, password).subscribe({
          next: (token) => {
            localStorage.setItem('token', JSON.stringify(token));
            this.userSvc.setCurUser(token);
            this.router.navigate(['/']);
          },
          error: (err) => {
            console.log(err);
          }
        });
      } else {

      }
    } else {
      
    }
  }

}
