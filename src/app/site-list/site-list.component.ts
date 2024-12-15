import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { PasswordManagerService } from '../services/password-manager.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-site-list',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './site-list.component.html',
  styleUrl: './site-list.component.css',
})
export class SiteListComponent implements OnInit {
  constructor(private PasswordManagerService: PasswordManagerService) {}

  siteForm = new FormGroup({
    siteName: new FormControl(),
    siteURL: new FormControl(),
    siteImageURL: new FormControl(),
  });

  formState: string = 'Add New';

  siteList!: Observable<Array<any>>;

  siteName!: string;
  siteURL!: string;
  siteImageURL!: string;
  siteId!: string;

  isSuccess: boolean = false;
  dataMsg!: string;

  // load websites
  loadSites() {
    this.siteList = this.PasswordManagerService.getAllSites();
  }

  // on load the component
  ngOnInit(): void {
    this.loadSites();
  }

  showAlert(msg: string) {
    this.isSuccess = true;
    this.dataMsg = msg;
  }

  resetForm() {
    this.siteName = '';
    this.siteURL = '';
    this.siteImageURL = '';
    this.formState = 'Add New';
  }

  // submit the data
  onSubmit() {
    if (this.formState === 'Add New') {
      this.PasswordManagerService.addSite(this.siteForm.value)
        .then(() => {
          this.showAlert('data saved successfully');
          this.resetForm();
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (this.formState === 'Update') {
      this.PasswordManagerService.updateSite(this.siteId, this.siteForm.value)
        .then(() => {
          this.showAlert('data updated successfully');
          this.resetForm();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // on edit click
  onEdit(
    siteName: string,
    siteURL: string,
    siteImageURL: string,
    siteId: string
  ) {
    this.siteName = siteName;
    this.siteURL = siteURL;
    this.siteImageURL = siteImageURL;
    this.siteId = siteId;
    this.formState = 'Update';
  }

  // delete site
  deleteSite(id: string) {
    this.PasswordManagerService.deleteSite(id)
      .then(() => {
        this.showAlert('data deleted successfully');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
