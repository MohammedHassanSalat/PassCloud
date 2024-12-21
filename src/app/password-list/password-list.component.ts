import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PasswordManagerService } from '../services/password-manager.service';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-password-list',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './password-list.component.html',
  styleUrl: './password-list.component.css',
})
export class PasswordListComponent implements OnInit, OnDestroy {
  // Form group to manage website passwords
  passwordForm = new FormGroup({
    email: new FormControl(),
    userName: new FormControl(),
    password: new FormControl(),
  });

  // Component state variables
  formState: string = 'Add New'; // Tracks whether adding or updating a password
  passwordList!: Observable<Array<any>>; // Holds the list of passwords
  passwordId!: string; // Holds the ID of the password being edited
  siteId!: string; // Holds the ID of the site being edited
  siteName!: string; // Holds the name of the site being edited
  siteURL!: string; // Holds the url of the site being edited
  siteImageURL!: string; // Holds the image ulr of the site being edited
  isSuccess: boolean = false; // Indicates success status for alerts
  dataMsg!: string; // Stores the message to display in alerts

  routeSubscription!: Subscription; // Subscription to the params

  constructor(
    private activatedRoute: ActivatedRoute,
    private passwordManagerService: PasswordManagerService
  ) {}

  // Initialize the component and load site details and passwords.
  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.queryParams.subscribe(
      (params: any) => {
        this.siteId = params.id;
        this.siteName = params.Name;
        this.siteURL = params.url;
        this.siteImageURL = params.ImageURL;
      }
    );
    this.loadPasswords();
  }

  // Load all passwords for the current site.
  loadPasswords(): void {
    this.passwordList = this.passwordManagerService.getAllPasswords(
      this.siteId
    );
  }

  // Display an alert message.
  displayAlert(message: string): void {
    this.isSuccess = true;
    this.dataMsg = message;
  }

  // Reset the form to its initial state.
  resetForm(): void {
    this.passwordForm.reset();
    this.formState = 'Add New';
    this.passwordId = '';
  }

  // Submit the form data for adding or updating a website.
  onSubmit(): void {
    if (this.formState === 'Add New') {
      this.passwordManagerService
        .addPassword(this.passwordForm.value, this.siteId)
        .then(() => {
          this.displayAlert('Password saved successfully');
          this.resetForm();
        })
        .catch((error) => console.error('Error adding password:', error));
    } else if (this.formState === 'Update') {
      this.passwordManagerService
        .updatePassword(this.siteId, this.passwordId, this.passwordForm.value)
        .then(() => {
          this.displayAlert('Password updated successfully');
          this.resetForm();
        })
        .catch((error) => console.error('Error updating password:', error));
    }
  }

  // Set the form to update mode with the selected password's details.
  onUpdate(
    id: string,
    email: string,
    userName: string,
    password: string
  ): void {
    this.passwordForm.setValue({
      email: email,
      userName: userName,
      password: password,
    });
    this.passwordId = id;
    this.formState = 'Update';
  }

  // Delete a password by its ID..
  onDelete(passwordId: string): void {
    this.passwordManagerService
      .deletePassword(this.siteId, passwordId)
      .then(() => {
        this.displayAlert('Password deleted successfully');
      })
      .catch((error) => console.error('Error deleting password:', error));
  }

  // Unsubscribe from observables when the component is destroyed.
  // Cleanup subscription to prevent memory leaks.
  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
