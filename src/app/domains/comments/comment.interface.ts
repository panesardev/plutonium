import type { FormControl } from "@angular/forms";

export interface Comment {
  id?: string;
  text: string;
  created: string;
  displayName: string;
  photoURL: string;
  slug: string;
}

export interface CommentFormValue {
  text: string;
}
