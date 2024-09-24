import { inject, Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, getAdditionalUserInfo, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { AdditionalUserData, AuthProviderName, AuthUser, Credentials } from './auth.interface';
import { createUserData, getAuthProvider } from './auth.utilities';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  user$: Observable<AuthUser> = authState(this.auth).pipe(
    switchMap(user => 
      docData(doc(this.firestore, `users/${user.uid}`)).pipe(
        map((data: AdditionalUserData) => ({ ...user, ...data })),
      ),
    ),
    catchError(e => of(null)),
  );

  isAuthenticated$: Observable<boolean> = authState(this.auth).pipe(
    map(user => !!user),
  );

  async createAccount({ email, password, displayName }: Credentials): Promise<void> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    await Promise.all([
      updateProfile(credential.user, { displayName }), 
      this.setUserDoc(credential.user.uid, createUserData()),
    ]);
  }

  async login({ email, password }: Credentials): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password);
  }

  async oAuthLogin(providerName: AuthProviderName): Promise<void> {
    const provider = getAuthProvider(providerName);
    const credential = await signInWithPopup(this.auth, provider);

    if (getAdditionalUserInfo(credential).isNewUser) {
      await this.setUserDoc(credential.user.uid, createUserData());
    }
  }

  async resetPassword({ email }: Credentials): Promise<void> {
    await sendPasswordResetEmail(this.auth, email);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }
  
  async setUserDoc(uid: string, data: AdditionalUserData): Promise<void> {
    await setDoc(doc(this.firestore, `users/${uid}`), data);
  }
}
