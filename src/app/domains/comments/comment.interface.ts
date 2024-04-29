import { AbstractControl, ValidatorFn } from "@angular/forms";

export interface Comment {
  id?: string;
  text: string;
  created: string;
  displayName: string;
  photoURL: string;
  slug: string;
}

export function createComment(comment: Partial<Comment>): Comment {
  return {
    created: new Date().toString(),
    slug: comment.slug,
    displayName: comment.displayName,
    photoURL: comment.photoURL,
    text: comment.text,
  };
}

export function emptyValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const isEmpty = /^\s*$/.test(control.value);
    return isEmpty ? control.value : null ;
  }
}