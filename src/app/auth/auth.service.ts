import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { createUserWithEmailAndPassword, getAdditionalUserInfo, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { user as userChanges } from 'rxfire/auth';
import { docData as docChanges } from 'rxfire/firestore';
import { type Observable, map, of, switchMap } from 'rxjs';
import { API_URL } from '../app.constants';
import { AdditionalUserData, AdminResponse, AuthUser, OAuthProviderName } from './auth.interface';
import { createUserData, getAuthProvider } from "./auth.utilities";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private auth = getAuth();
  private firestore = getFirestore();

  user$ = userChanges(this.auth).pipe(
    switchMap(user => {
      if (user) {
        return docChanges(doc(this.firestore, `users/${user.uid}`)).pipe(
          map(data => ({ ...user, ...data })),
        ) as Observable<AuthUser>;
      }
      else return of(null);
    }),
  );

  isAdmin$ = userChanges(this.auth).pipe(
    switchMap(user => {
      if (user) {
        const URL = `${API_URL}/auth/is-admin/${user.email}`;
        return this.http.get<AdminResponse>(URL).pipe(
          map(response => response.isAdmin),
        );
      }
      else return of(false);
    }),
  );

  async createAccount(email: string, password: string, displayName: string): Promise<string> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    await Promise.all([
      updateProfile(credential.user, { displayName }), 
      this.setUser(credential.user.uid, createUserData()),
    ]);
    return credential.user.displayName;
  }

  async login(email: string, password: string): Promise<string> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    return credential.user.displayName;
  }

  async socialLogin(providerName: OAuthProviderName): Promise<string> {
    const provider = getAuthProvider(providerName);
    const credential = await signInWithPopup(this.auth, provider);

    if (getAdditionalUserInfo(credential).isNewUser)
      await this.setUser(credential.user.uid, createUserData());

    return credential.user.displayName;
  }

  async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(this.auth, email);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }
  
  async setUser(uid: string, data: AdditionalUserData): Promise<void> {
    await setDoc(doc(this.firestore, `users/${uid}`), data);
  }
}

