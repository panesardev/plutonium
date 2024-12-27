import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CommentFormValue } from '../comment.interface';

const emptyValidator: ValidatorFn = (control: AbstractControl) => {
  const isEmpty = /^\s*$/.test(control.value);
  return isEmpty ? control.value : null;
}

@Component({
    selector: 'app-comment-form',
    imports: [
        ReactiveFormsModule,
    ],
    template: `
    <form [formGroup]="form" (submit)="submit()">
      <fieldset class="w-full mb-4">
        <textarea class="w-full" formControlName="text" placeholder="Write a comment here"></textarea>
      </fieldset>
      <div class="flex justify-end">
        <button class="btn-primary" type="submit" [disabled]="form.invalid">Post comment</button>
      </div>
    </form>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentFormComponent {
  onSubmit = output<CommentFormValue>();

  form = new FormGroup({
    text: new FormControl('', [Validators.required, emptyValidator]),
  });
  
  submit() {
    this.onSubmit.emit(this.form.getRawValue());
    this.form.reset();
  }
}
