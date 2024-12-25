import { Component, OnInit } from '@angular/core';
import { DarkmodeService } from '../services/darkmode.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  constructor(
    public DarkmodeService: DarkmodeService,
    private AuthService: AuthService,
    private Router: Router
  ) {}

  // Determines whether the logout button should be displayed
  showLogout!: boolean;

  // Set up subscription to monitor route changes.
  // Hides logout button on the login page.
  ngOnInit(): void {
    this.Router.events.subscribe(() => {
      this.showLogout = this.Router.url !== '/login';
    });
  }

  // Toggles the theme between light and dark mode.
  toggleTheme() {
    this.DarkmodeService.updateTheme();
  }

  // Logs out the user and navigates to the login page.
  // Clears the token from local storage upon successful logout.
  onLogout() {
    this.AuthService.signOut().then(
      () => {
        window.localStorage.removeItem('token');
        this.Router.navigate(['login']);
      },
      (err) => {
        console.error('Logout failed:', err.message);
      }
    );
  }
}
