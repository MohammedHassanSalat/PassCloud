import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { PasswordManagerService } from '../services/password-manager.service';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-site-list',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './site-list.component.html',
  styleUrl: './site-list.component.css',
})
export class SiteListComponent implements OnInit, OnDestroy {
  // Form group to manage website data
  siteForm = new FormGroup({
    siteName: new FormControl(),
    siteURL: new FormControl(),
    siteImageURL: new FormControl(),
  });

  // Component state variables
  formState: string = 'Add New'; // Tracks whether adding or updating a website
  siteListSubscription!: Subscription; // Subscription to websiteList
  siteList!: Array<any>; // Holds the list of websites
  siteId!: string; // Holds the ID of the site being edited
  isSuccess: boolean = false; // Indicates success status for alerts
  dataMsg!: string; // Stores the message to display in alerts

  constructor(private passwordManagerService: PasswordManagerService) {}

  ngOnInit(): void {
    this.fetchSiteList(); // Load websites when the component initializes
  }

  // Fetch the list of websites.
  fetchSiteList(): void {
    this.siteListSubscription = this.passwordManagerService
      .getAllSites()
      .subscribe((sites) => {
        this.siteList = sites;
      });
  }

  // Display an alert with the provided message.
  displayAlert(message: string): void {
    this.isSuccess = true;
    this.dataMsg = message;
  }

  // Reset the form to its initial state.
  resetForm(): void {
    this.siteForm.reset();
    this.formState = 'Add New';
    this.siteId = '';
  }

  // Submit the form data for adding or updating a website.
  onSubmit(): void {
    if (this.formState === 'Add New') {
      this.passwordManagerService
        .addSite(this.siteForm.value)
        .then(() => {
          this.displayAlert('Website added successfully');
          this.resetForm();
        })
        .catch((error) => {
          console.error('Error adding website:', error);
        });
    } else if (this.formState === 'Update') {
      this.passwordManagerService
        .updateSite(this.siteId, this.siteForm.value)
        .then(() => {
          this.displayAlert('Website updated successfully');
          this.resetForm();
        })
        .catch((error) => {
          console.error('Error updating website:', error);
        });
    }
  }

  // Set the form to update mode with the selected website's details.
  onUpdate(
    siteName: string,
    siteURL: string,
    siteImageURL: string,
    siteId: string
  ): void {
    this.siteForm.setValue({
      siteName,
      siteURL,
      siteImageURL,
    });
    this.siteId = siteId;
    this.formState = 'Update';
  }

  //  Delete a website by its ID.
  onDelete(siteId: string): void {
    this.passwordManagerService
      .deleteSite(siteId)
      .then(() => {
        this.displayAlert('Website deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting website:', error);
      });
  }

  // Unsubscribe from observables when the component is destroyed.
  // Cleanup subscription to prevent memory leaks.
  ngOnDestroy(): void {
    if (this.siteListSubscription) {
      this.siteListSubscription.unsubscribe();
    }
  }
}
