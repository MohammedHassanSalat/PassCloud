import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PasswordManagerService {
  constructor(private firestore: Firestore) {}

  // Add a new website to the database.
  // @returns Promise<void> so the rest of the methods but getAllSites
  addSite(data: object) {
    const siteCollection = collection(this.firestore, 'sites');
    return addDoc(siteCollection, data);
  }

  // Retrieve all websites from the database.
  // @returns Observable containing the list of sites
  getAllSites() {
    const siteCollection = collection(this.firestore, 'sites');
    return collectionData(siteCollection, { idField: 'id' });
  }

  // Update a website in the database.
  updateSite(siteId: string, data: object) {
    const siteDoc = doc(this.firestore, 'sites', siteId);
    return updateDoc(siteDoc, data);
  }

  // Delete a website from the database.
  deleteSite(siteId: string) {
    const siteDoc = doc(this.firestore, 'sites', siteId);
    return deleteDoc(siteDoc);
  }

  // Add a new password to a specific website.
  addPassword(data: object, siteId: string) {
    const passwordCollection = collection(
      this.firestore,
      `sites/${siteId}/passwords`
    );
    return addDoc(passwordCollection, data);
  }

  // Retrieve all passwords for a specific website.
  getAllPasswords(siteId: string) {
    const passwordCollection = collection(
      this.firestore,
      `sites/${siteId}/passwords`
    );
    return collectionData(passwordCollection, { idField: 'id' });
  }

  // Update a password for a specific website.
  updatePassword(siteId: string, passwordId: string, data: object) {
    const passwordDoc = doc(
      this.firestore,
      `sites/${siteId}/passwords`,
      passwordId
    );
    return updateDoc(passwordDoc, data);
  }

  // Delete a password from a specific website.
  deletePassword(siteId: string, passwordId: string) {
    const passwordDoc = doc(
      this.firestore,
      `sites/${siteId}/passwords`,
      passwordId
    );
    return deleteDoc(passwordDoc);
  }
}
