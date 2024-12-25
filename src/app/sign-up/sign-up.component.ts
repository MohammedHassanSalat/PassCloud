import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  constructor(private AuthService: AuthService, private Router: Router) {}

  // Form group for user regiteration
  signupForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
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
    this.signupForm.reset();
  }

  // Handles the form submission for sign up
  onSubmit() {
    this.AuthService.register(
      this.signupForm.value.email,
      this.signupForm.value.password
    ).then(
      () => {
        this.Router.navigate(['login']);
      },
      () => {
        this.displayAlert('invlaid data please try again');
      }
    );
  }
}
