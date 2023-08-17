import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';

const loggedIn: CanActivateFn = () => {
  let user = inject(UserService);
    if (user.userToken !== undefined) {
      return true;
    } else {
      user.router.navigate(['/login']);
      return false;
    }
}

const admin: CanActivateFn = () => {
  let user = inject(UserService);
  if (user.userObj.role === 'admin') {
    return true;
  } else {
    user.router.navigate(['/login']);
    return false;
  }
}

export { loggedIn, admin };