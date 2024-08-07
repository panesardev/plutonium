import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { createUserWithEmailAndPassword, getAdditionalUserInfo, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { user as userChanges } from 'rxfire/auth';
import { docData as docChanges } from 'rxfire/firestore';
import { map, of, switchMap, type Observable } from 'rxjs';
import { Auth, Firestore } from '../app.config';
import { API_URL } from '../app.constants';
import { AdditionalUserData, AdminResponse, AuthUser, OAuthProviderName } from './auth.interface';
import { createUserData, getAuthProvider } from "./auth.utilities";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  user$: Observable<AuthUser> = userChanges(this.auth).pipe(
    switchMap(user => {
      if (user) {
        return docChanges(doc(this.firestore, `users/${user.uid}`)).pipe(
          map(data => ({ ...user, ...data })),
        ) as Observable<AuthUser>;
      }
      return of(null);
    }),
  );
  
  isAdmin$: Observable<boolean> = userChanges(this.auth).pipe(
    switchMap(user => {
      if (user) {
        const URL = `${API_URL}/auth/is-admin/${user.email}`;
        return this.http.get<AdminResponse>(URL).pipe(
          map(response => response.isAdmin),
        );
      }
      return of(false);
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

