import { Injectable, inject } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, getAdditionalUserInfo, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, map, of, switchMap } from 'rxjs';
import { Credentials, OAuthProviderName } from '../types/auth.interface';
import { User, UserData } from '../types/user.interface';
import { getAuthProvider } from '../utilities/functions';
 
@Injectable({ providedIn: 'root' })
export class AuthService {

  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);

  readonly user$ = authState(this.auth).pipe(
    switchMap(user => user ? this.getUser(user as User) : of(null)),
  );

  async signUp({ email, password, displayName }: Credentials): Promise<void> {
    if (!displayName || !email || !password) {
      throw Error('Insufficient information');
    }
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    
    await Promise.all([
      updateProfile(credential.user, { displayName }),
      this.setUser(credential.user),
    ]); 

    await this.router.navigateByUrl('/dashboard');
    // this.toast.success(`Welcome ${credential.user.displayName}`);
  }

  async login({ email, password }: Credentials): Promise<void> {
    if (!email || !password) {
      throw Error('Invalid credentials');
    }
    await signInWithEmailAndPassword(this.auth, email, password);

    await this.router.navigateByUrl('/dashboard');
    // this.toast.success(`Welcome ${credential.user.displayName}`);
  }

  async socialLogin(providerName: OAuthProviderName): Promise<void> {
    const provider = getAuthProvider(providerName);
    const credential = await signInWithPopup(this.auth, provider);

    if (getAdditionalUserInfo(credential).isNewUser) {
      await this.setUser(credential.user);
    }

    await this.router.navigateByUrl('/dashboard');
    // this.toast.success(`Welcome ${credential.user.displayName}`);
  }

  async resetPassword({ email }: Credentials): Promise<void> {
    if (!email) {
      throw Error('Email required');
    }
    await sendPasswordResetEmail(this.auth, email);
    // this.toast.success('Password reset email sent');
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    await this.router.navigateByUrl('/');
    // this.toast.success('You have been logged out!');
  }
  
  async setUser(user: User, data?: UserData): Promise<void> {
    await setDoc(
      doc(this.firestore, `users/${user.uid}`), 
      data ? { ...data } : { isPro: false, saved: [] },
    );
  }

  getUser(user: User): Observable<User> {
    return docData(doc(this.firestore, `users/${user.uid}`)).pipe(
      map((data: UserData) => ({ ...user, ...data }))
    );
  }
}
