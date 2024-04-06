import { Injectable, inject } from '@angular/core';
import { Auth, User as AuthUser, authState, createUserWithEmailAndPassword, getAdditionalUserInfo, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, map, of, switchMap } from 'rxjs';
import { AuthData, OAuthProviderName, getAuthProvider } from '../types/auth.interface';
import { User, UserData, createUserData } from '../types/user.interface';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../app.constants';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);

  readonly user$ = authState(this.auth).pipe(
    switchMap((user: AuthUser) => {
      if (user) {
        return docData(doc(this.firestore, `users/${user.uid}`)).pipe(
          map((data: UserData) => ({ ...user, ...data })),
        ) as Observable<User>;
      }
      else return of(null);
    }),
  );

  readonly isAdmin$ = this.user$.pipe(
    switchMap(user => {
      if (user) {
        return this.http.get<{ isAdmin: boolean }>(`${API_URL}/auth/is-admin/${user.email}`).pipe(
          map(response => response.isAdmin),
        ) as Observable<boolean>;
      }
      else return of(false);
    }),
  );
  
  async createAccount({ email, password, displayName }: AuthData): Promise<void> {
    if (!email || !password || !displayName) {
      throw Error('insufficient information provided');
    }
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    await Promise.all([
      updateProfile(credential.user, { displayName }), 
      this.setUser(credential.user.uid, createUserData()),
      this.router.navigateByUrl('/dashboard'),
    ]);
  }

  async login({ email, password }: AuthData): Promise<void> {
    if (!email || !password) {
      throw Error('email and password required');
    }
    await signInWithEmailAndPassword(this.auth, email, password);
    await this.router.navigateByUrl('/dashboard');
  }

  async oAuthLogin(providerName: OAuthProviderName): Promise<void> {
    const provider = getAuthProvider(providerName);
    const credential = await signInWithPopup(this.auth, provider);

    if (getAdditionalUserInfo(credential).isNewUser)
      await this.setUser(credential.user.uid, createUserData());

    await this.router.navigateByUrl('/dashboard');
  }

  async resetPassword({ email }: AuthData): Promise<void> {
    if (!email) {
      throw Error('email required');
    }
    await sendPasswordResetEmail(this.auth, email);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    await this.router.navigateByUrl('/');
  }
  
  async setUser(uid: string, data: UserData): Promise<void> {
    await setDoc(doc(this.firestore, `users/${uid}`), data);
  }
}
