import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { emptyValidator } from '../comment.utilities';
import { CommentForm, CommentFormValue } from '../comment.interface';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  template: `
    <form [formGroup]="form" (submit)="submit()">
      <fieldset class="w-full mb-4">
        <textarea class="w-full" formControlName="text" placeholder="Write a comment here"></textarea>
      </fieldset>
      <div class="flex justify-end">
        <button class="btn-primary" [disabled]="form.invalid">Post comment</button>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentFormComponent {
  onSubmit = output<CommentFormValue>();

  form = new FormGroup<CommentForm>({
    text: new FormControl('', [Validators.required, emptyValidator()]),
  });
  
  submit() {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value);
      this.form.reset();
    }
  }
}
