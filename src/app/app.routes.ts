import { Routes } from '@angular/router';
import { SiteListComponent } from './site-list/site-list.component';
import { PasswordListComponent } from './password-list/password-list.component';

export const routes: Routes = [
  {path: '',component:SiteListComponent},
  {path: 'site-list',component:SiteListComponent},
  {path: 'password-list',component:PasswordListComponent},
];
