import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent} from './login/login.component';
import { SearchComponent} from './search/search.component'
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { loggedIn, admin } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [loggedIn],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: HomeComponent,
    canActivate: [admin],
    children: [
      {
        path: 'search',
        component: SearchComponent,
      }
    ]
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
  {
    path: '**',
    redirectTo: '/login',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
