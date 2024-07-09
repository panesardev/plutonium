import type { AbstractControl, ValidatorFn } from "@angular/forms";
import { Comment } from "./comment.interface";

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
