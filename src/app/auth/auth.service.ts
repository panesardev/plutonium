import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { createUserWithEmailAndPassword, getAdditionalUserInfo, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { user as userChanges } from 'rxfire/auth';
import { docData as docChanges } from 'rxfire/firestore';
import { combineLatest, map, of, switchMap, type Observable } from 'rxjs';
import { API_URL } from '../app.constants';
import { AdditionalUserData, AdminResponse, AuthState, AuthUser, OAuthProviderName } from './auth.interface';
import { createUserData, getAuthProvider, initialState } from "./auth.utilities";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private auth = getAuth();
  private firestore = getFirestore();

  private state = signal<AuthState>(initialState);

  stateChanges$: Observable<AuthState> = userChanges(this.auth).pipe(
    switchMap(user => {
      if (user) {
        return combineLatest({
          user: docChanges(doc(this.firestore, `users/${user.uid}`)).pipe(
            map(data => ({ ...user, ...data })),
          ) as Observable<AuthUser>,
          isAdmin: this.http.get<AdminResponse>(`${API_URL}/auth/is-admin/${user.email}`).pipe(
            map(response => response.isAdmin),
          ),
        })
      }
      else return of(initialState);
    }),
  );

  user = computed(() => this.state().user);
  isAdmin = computed(() => this.state().isAdmin);

  constructor() {
    this.stateChanges$.subscribe({
      next: next => this.state.update(v => ({ ...v, ...next })),
      error: () => this.state.set(initialState),
    });
  }

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

