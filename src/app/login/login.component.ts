import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(private AuthService: AuthService, private Router: Router) {}

  //  Redirects user to 'site-list' if already logged in
  ngOnInit(): void {
    if (window.localStorage.getItem('token')) {
      this.Router.navigate(['site-list']);
    }
  }

  // Form group for user log in
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/), // ensure right email pattern
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/), // ensure a strong password pattern
    ]),
  });


  // Variables to handle alert display
  isSuccess: boolean = false;
  dataMsg: string = '';

  // Displays an alert message to the user
  displayAlert(dataMsg: string) {
    this.isSuccess = true;
    this.dataMsg = dataMsg;
  }

  // Reset the form to its initial state.
  resetForm() {
    this.loginForm.reset();
  }

  // Handles the form submission for login
  onSubmit() {
    this.AuthService.signin(
      this.loginForm.value.email,
      this.loginForm.value.password
    ).then(
      () => {
        window.localStorage.setItem('token', this.AuthService.getCurrentUserId());
        this.Router.navigate(['site-list']);
      },
      () => {
        this.displayAlert('invlaid data please try again');
      }
    );
  }
}
