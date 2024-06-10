import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User, createUserWithEmailAndPassword, getAdditionalUserInfo, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { authState } from 'rxfire/auth';
import { docData as doc$ } from 'rxfire/firestore';
import { Observable, map, of, switchMap } from 'rxjs';
import { API_URL } from '../app.constants';
import { AdminResponse, AuthUser, AuthUserData, OAuthProviderName } from './auth.interface';
import { createAuthUserData, getAuthProvider } from "./auth.utilities";
import { AUTH, FIRESTORE } from '../app.config';

@Injectable()
export class AuthService {
  private http = inject(HttpClient);
  private auth = inject(AUTH);
  private firestore = inject(FIRESTORE);
  private router = inject(Router);

  user$: Observable<AuthUser> = authState(this.auth).pipe(
    switchMap((user: User) => {
      if (user) {
        return doc$(doc(this.firestore, `users/${user.uid}`)).pipe(
          map(data => ({ ...user, ...data })),
        ) as Observable<AuthUser>;
      }
      else return of(null);
    }),
  );

  isAdmin$: Observable<boolean> = authState(this.auth).pipe(
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

  async createAccount(email: string, password: string, displayName: string): Promise<void> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    await Promise.all([
      updateProfile(credential.user, { displayName }), 
      this.setUser(credential.user.uid, createAuthUserData()),
    ]);
    await this.router.navigate(['/dashboard']);
  }

  async login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password);
    await this.router.navigate(['/dashboard']);
  }

  async oAuthLogin(providerName: OAuthProviderName): Promise<void> {
    const provider = getAuthProvider(providerName);
    const credential = await signInWithPopup(this.auth, provider);

    if (getAdditionalUserInfo(credential).isNewUser)
      await this.setUser(credential.user.uid, createAuthUserData());

    await this.router.navigate(['/dashboard']);
  }

  async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(this.auth, email);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    await this.router.navigate(['/']);
  }
  
  async setUser(uid: string, data: AuthUserData): Promise<void> {
    await setDoc(doc(this.firestore, `users/${uid}`), data);
  }
}

