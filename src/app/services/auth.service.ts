import { Injectable, inject } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, getAdditionalUserInfo, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthProvider, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { createEffect } from 'ngxtension/create-effect';
import { map, of, switchMap, tap } from 'rxjs';
import { LoginData, OAuthProviderName, ResetPasswordData, SignUpData } from '../interfaces/auth';
import { User, UserData } from '../interfaces/user';
 
@Injectable({ providedIn: 'root' })
export class AuthService {

  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);

  readonly user$ = authState(this.auth).pipe(
    switchMap(user => user ? this.getUserDocument$(user as User) : of(null)),
  );

  private getUserDocument$(user: User) {
    return docData(doc(this.firestore, `users/${user.uid}`)).pipe(
      map((data: UserData) => ({ ...user, ...data }))
    );
  }

  async signUp(data: SignUpData): Promise<void> {
    if (!data.displayName || !data.email || !data.password)
      throw Error('Insufficient information');
    
    const credential = await createUserWithEmailAndPassword(this.auth, data.email, data.password);
    
    await Promise.all([
      updateProfile(credential.user, { displayName: data.displayName }),
      this.createUserDocument$(credential.user as User),
    ]); 

    await this.router.navigateByUrl('/dashboard');
    // this.toast.success(`Welcome ${credential.user.displayName}`);
  }

  async login(data: LoginData): Promise<void> {
    if (!data.email || !data.password) 
      throw Error('Invalid credentials');
    
    await signInWithEmailAndPassword(this.auth, data.email, data.password);

    await this.router.navigateByUrl('/dashboard');
    // this.toast.success(`Welcome ${credential.user.displayName}`);
  }

  async socialLogin(providerName: OAuthProviderName): Promise<void> {
    const provider = getProvider(providerName);
    const credential = await signInWithPopup(this.auth, provider);

    if (getAdditionalUserInfo(credential).isNewUser) {
      this.createUserDocument$(credential.user);
    }

    await this.router.navigateByUrl('/dashboard');
    // this.toast.success(`Welcome ${credential.user.displayName}`);
  }

  async resetPassword(data: ResetPasswordData): Promise<void> {
    if (!data.email) {
      throw Error('Email required');
    }
    await sendPasswordResetEmail(this.auth, data.email);
    // this.toast.success('Password reset email sent');
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    await this.router.navigateByUrl('/');
    // this.toast.success('You have been logged out!');
  }
  
  private createUserDocument$ = createEffect<User>(
    tap(user => 
      setDoc(
        doc(this.firestore, `users/${user['uid']}`), 
        { isPro: false, saved: [] },
      ),
    ),
  );

  public updateUserDocument$ = createEffect<UserData>(
    switchMap(data => 
      this.user$.pipe(
        tap(user => setDoc(doc(this.firestore, `users/${user.uid}`), data))
      ),
    ),
  );
}

function getProvider(providerName: OAuthProviderName): AuthProvider {
  switch (providerName) {
    case 'google': return new GoogleAuthProvider();
    case 'github': return new GithubAuthProvider();
  }
}
