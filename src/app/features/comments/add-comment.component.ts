import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-comment',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  template: `
    <div class="input mb-6">
      <div class="flex flex-col md:flex-row justify-center items-center gap-4">
        <textarea class="w-full" [formControl]="textControl" placeholder="Write a comment here"></textarea>
        <button class="btn {{ textControl.invalid ? 'bg-slate-200 text-slate-400' : 'primary' }}" (click)="add()" [disabled]="textControl.invalid">Post</button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCommentComponent {
  onAdd = output<string>();

  textControl = new FormControl('', [Validators.required, emptyValidator()]);

  add() {
    this.onAdd.emit(this.textControl.value);
    this.textControl.reset();
  }
}

export function emptyValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const isEmpty = /^\s*$/.test(control.value);
    return isEmpty ? control.value : null ;
  }
}
