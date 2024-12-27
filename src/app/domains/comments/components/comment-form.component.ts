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
      <div class="input-field mb-4">
        <textarea id="text" class="peer" formControlName="text" placeholder="" rows="1"></textarea>
        <label for="text" class="peer-focus:text-primary peer-focus:top-1 peer-focus:left-2.5 peer-focus:scale-75 peer-focus:-translate-y-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
          <span>Write a comment</span>
        </label>
      </div>
      <div class="flex justify-end">
        <button class="btn-primary" type="submit" [disabled]="form.invalid">Post comment</button>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CommentFormComponent {
  onSubmit = output<CommentFormValue>();

  form = new FormGroup({
    text: new FormControl('', [Validators.required, emptyValidator]),
  });
  
  submit() {
    this.onSubmit.emit(this.form.getRawValue());
    this.form.reset();
  }
}
