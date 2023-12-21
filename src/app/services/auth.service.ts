import { Injectable, inject } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, getAdditionalUserInfo, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthProvider, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { Observable, map, of, shareReplay, switchMap } from 'rxjs';
import { LoginData, OAuthProviderName, ResetPasswordData, SignUpData } from '../interfaces/auth';
import { User, UserData } from '../interfaces/user';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);

  readonly user$ = authState(this.auth).pipe(
    switchMap(user => user ? this.mapUser(user as User) : of(null)),
    shareReplay(1),
  );

  async signUp(data: SignUpData): Promise<void> {
    if (!data.displayName || !data.email || !data.password)
      throw Error('Insufficient information');
    
    const credential = await createUserWithEmailAndPassword(this.auth, data.email, data.password);
    
    await Promise.all([
      updateProfile(credential.user, { displayName: data.displayName }),
      this.updateUserDoc(credential.user as User)
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

    if (getAdditionalUserInfo(credential).isNewUser)
      await this.updateUserDoc(credential.user as User);

    await this.router.navigateByUrl('/dashboard');
    // this.toast.success(`Welcome ${credential.user.displayName}`);
  }

  async updateUserDoc(user: User, data?: UserData): Promise<void> {
    const payload: UserData = {
      isPro: false,
      saved: [],
    }

    if (data && data.isPro) payload.isPro = data.isPro;
    if (data && data.saved) payload.saved = data.saved;

    await setDoc(
      doc(this.firestore, `users/${user.uid}`), 
      payload, 
      { merge: true },
    );
  }

  async resetPassword(data: ResetPasswordData): Promise<void> {
    if (!data.email) 
      throw Error('Email required');
    
    await sendPasswordResetEmail(this.auth, data.email);
    // this.toast.success('Password reset email sent');
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    await this.router.navigateByUrl('/');
    // this.toast.success('You have been logged out!');
  }

  private mapUser(user: User): Observable<User> {
    return docData(doc(this.firestore, `users/${user.uid}`)).pipe(
      map((data: UserData) => ({ ...user, ...data })),
    );
  }
}

function getProvider(providerName: OAuthProviderName): AuthProvider {
  switch (providerName) {
    case 'google': return new GoogleAuthProvider();
    case 'github': return new GithubAuthProvider();
  }
}
