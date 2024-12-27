import { inject, Injectable } from '@angular/core';
import { Auth, AuthProvider, authState, createUserWithEmailAndPassword, getAdditionalUserInfo, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map, of, switchMap } from 'rxjs';
import { AdditionalUserData, User } from './auth.interface';
import { createUserData } from './auth.utils';
import { CreateAccountFormValue } from './pages/create-account/create-account.component';
import { LoginFormValue } from './pages/login/login.component';
import { ResetPasswordFormValue } from './pages/reset-password/reset-password.component';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);

  isAuthenticated$ = authState(this.auth).pipe(
    map(user => !!user),
  );

  user$ = authState(this.auth).pipe(
    switchMap(user => {
      if (user) {
        return docData(doc(this.firestore, `users/${user.uid}`)).pipe(
          map(data => ({ ...user, ...data }) as User),
        );
      }
      return of(null);
    }),
  );

  async login(value: LoginFormValue): Promise<void> {
    await signInWithEmailAndPassword(this.auth, value.email, value.password);
    await this.router.navigateByUrl('/dashboard');
  }

  async loginWithProvider(provider: AuthProvider): Promise<void> {
    const credential = await signInWithPopup(this.auth, provider);

    if (getAdditionalUserInfo(credential).isNewUser) {
      await this.setUserDoc(credential.user.uid, createUserData());
    }
    await this.router.navigateByUrl('/dashboard');
  }

  async createAccount(value: CreateAccountFormValue): Promise<void> {
    const credential = await createUserWithEmailAndPassword(this.auth, value.email, value.password);

    await updateProfile(credential.user, { displayName: value.displayName }), 
    await this.setUserDoc(credential.user.uid, createUserData());
    await this.router.navigateByUrl('/dashboard');
  }

  async resetPassword(value: ResetPasswordFormValue): Promise<void> {
    await sendPasswordResetEmail(this.auth, value.email);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    await this.router.navigateByUrl('/login');
  }

  async deleteAccount(): Promise<void> {
    // const user = this.auth.currentUser;
    // await deleteUser(user);
    // await deleteDoc(doc(this.firestore, `users/${user.uid}`));
    alert('not implemented yet');
  }
  
  async setUserDoc(uid: string, data: AdditionalUserData): Promise<void> {
    await setDoc(doc(this.firestore, `users/${uid}`), data);
  }
}
