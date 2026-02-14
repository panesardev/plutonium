import { inject, Injectable } from '@angular/core';
import { Auth, authState, deleteUser, User as FirebaseUser, getAdditionalUserInfo, reauthenticateWithPopup, signInWithPopup, signOut } from '@angular/fire/auth';
import { deleteDoc, doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { map, Observable, of, switchMap } from 'rxjs';
import { User, UserDoc } from './auth.interface';
import { getAuthProvider } from './auth.providers';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);
  private toast = inject(HotToastService);

  isAuthenticated$: Observable<boolean> = authState(this.auth).pipe(
    map(user => !!user),
  );

  user$: Observable<User> = authState(this.auth).pipe(
    switchMap((user: FirebaseUser) => {
      if (user)
        return docData(doc(this.firestore, `users/${user.uid}`)).pipe(
          map((doc: UserDoc) => ({ ...user, ...doc }) as User),
        );
      return of(null);
    }),
  );

  async loginWithProvider(providerId: string): Promise<void> {
    try {
      const provider = getAuthProvider(providerId);
      const credential = await signInWithPopup(this.auth, provider);
  
      if (getAdditionalUserInfo(credential).isNewUser) {
        await this.setUserDoc(credential.user.uid, { articles: [] });
  
        this.toast.success(`Welcome ${credential.user.displayName}`);
      }
      else {
        this.toast.success(`Logged in as ${credential.user.displayName}`);
      }
    }
    catch (e) {
      this.toast.error(e.message.slice(9));
    }
  }

  async logout(): Promise<void> {
    try { 
      await signOut(this.auth);
      
      await this.router.navigateByUrl('/');
      this.toast.info('You have been logged out!');
    } 
    catch (e) {
      this.toast.error(e.message);
    }
  }

  async deleteAccount(): Promise<void> {
    try { 
      const user = this.auth.currentUser;

      const providerId = user.providerData[0].providerId;
      const provider = getAuthProvider(providerId);

      await reauthenticateWithPopup(user, provider);
      await deleteDoc(doc(this.firestore, `users/${user.uid}`));
      await deleteUser(user);

      this.router.navigateByUrl('/');
      this.toast.error('Your account has been deleted!');
    } 
    catch (e) {
      this.toast.error(e.message);
    }
  }

  async setUserDoc(uid: string, docData: UserDoc): Promise<void> {
    try { 
      await setDoc(doc(this.firestore, `users/${uid}`), docData);
    } 
    catch (e) {
      this.toast.error(e.message);
    }
  }
}
