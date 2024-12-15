import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PasswordManagerService {
  constructor(private firestore: Firestore) {}

  // add a website to the database
  addSite(data: object) {
    const dbInstance = collection(this.firestore, 'sites');
    return addDoc(dbInstance, data);
  }

  // get all website from the database
  getAllSites() {
    const dbInstance = collection(this.firestore, 'sites');
    return collectionData(dbInstance, { idField: 'id' });
  }

  // update site
  updateSite(id: string, data: object) {
    const docInstance = doc(this.firestore, 'sites', id);
    return updateDoc(docInstance, data);
  }

  // delete site
  deleteSite(id: string) {
    const docInstance = doc(this.firestore, 'sites', id);
    return deleteDoc(docInstance)
  }
}
