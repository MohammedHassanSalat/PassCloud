import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"password-manager-2b55d","appId":"1:818985690594:web:3d984dee2646015e4d05bb","storageBucket":"password-manager-2b55d.firebasestorage.app","apiKey":"AIzaSyBAJuY5SrXhjwDyjIm0sG2M8bjCiuiWJH4","authDomain":"password-manager-2b55d.firebaseapp.com","messagingSenderId":"818985690594"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideMessaging(() => getMessaging())]
};
