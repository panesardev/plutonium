import { User as FirebaseUser } from '@firebase/auth';

export interface User extends FirebaseUser, UserData {}

export interface UserData {
  slugs: string[];
  created: string;
}

export function newUserData() {
  return {
    slugs: [],
    created: new Date().toDateString().slice(3),
  }
}