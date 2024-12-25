import { Routes } from '@angular/router';
import { SiteListComponent } from './site-list/site-list.component';
import { PasswordListComponent } from './password-list/password-list.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'site-list', component: SiteListComponent, canActivate: [authGuard] },
  {
    path: 'password-list',
    component: PasswordListComponent,
    canActivate: [authGuard],
  },
];
