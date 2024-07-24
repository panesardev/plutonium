import type { FormControl } from "@angular/forms";

export interface Comment {
  id?: string;
  text: string;
  created: string;
  displayName: string;
  photoURL: string;
  slug: string;
}

export interface CommentForm {
  text: FormControl<string>;
}

export interface CommentFormValue {
  text?: string;
}
