import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private Auth:Auth) {}

  // add user to the db
  register(email: any, password: any) {
    return createUserWithEmailAndPassword(this.Auth, email ,password);
  }

  // ensure user is in the db
  signin(email: any, password: any) {
    return signInWithEmailAndPassword(this.Auth ,email ,password);
  }

  // logOut from platform
  signOut(){
    return signOut(this.Auth);
  }

  // get current user by his id
  getCurrentUserId(): any {
    const user = this.Auth.currentUser?.uid;
    return user;
  }

}
