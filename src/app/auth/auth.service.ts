import { inject, Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, getAdditionalUserInfo, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { map, of, switchMap } from 'rxjs';
import { AdditionalUserData, AuthProviderName, AuthUser, Credentials } from './auth.interface';
import { createUserData, getAuthProvider } from './auth.utilities';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  isAuthenticated$ = authState(this.auth).pipe(
    map(user => !!user),
  );

  user$ = authState(this.auth).pipe(
    switchMap(user => {
      if (user) {
        return docData(doc(this.firestore, `users/${user.uid}`)).pipe(
          map(data => ({ ...user, ...data }) as AuthUser),
        );
      }
      return of(null);
    }),
  );

  async createAccount({ email, password, displayName }: Credentials): Promise<void> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);

    await updateProfile(credential.user, { displayName }), 
    await this.setUserDoc(credential.user.uid, createUserData());
  }

  async login({ email, password }: Credentials): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password);
  }

  async loginWithProvider(providerName: AuthProviderName): Promise<void> {
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
