import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';
import { firstValueFrom, Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CommentService } from '../../services/comment.service';
import { Comment, createComment } from '../../types/comment.interface';
import { CommentListComponent } from '../components/comment-list.component';

@Component({
  selector: 'app-comment-box',
  standalone: true,
  imports: [
    AsyncPipe,
    CommentListComponent,
    ReactiveFormsModule,
  ],
  template: `
    <div class="px-4 md:px-0">
      <h1 class="font-bold text-2xl text-center text-primary mb-8">Comments</h1>
      @if (user$ | async; as user) {
        @if (error()) {
          <div class="flex items-center gap-3 bg-red-100 text-red-500 rounded mb-4 px-4 py-3 cursor-pointer" (click)="error.set(null)">
            <span>{{ error() }}</span>
          </div>
        }
        <form [formGroup]="commentForm" (submit)="addComment()" class="input mb-6">
          <div class="flex flex-col md:flex-row justify-center items-center gap-4">
            <textarea class="w-full" formControlName="text" placeholder="Write a comment here"></textarea>
            <button type="submit" class="btn {{ commentForm.invalid ? 'bg-slate-200 text-slate-400' : 'primary' }}" [disabled]="commentForm.invalid">Post</button>
          </div>
        </form>
      }
      @else {
        <div class="flex justify-center items-center gap-3 bg-red-100 text-red-500 rounded mb-4 px-4 py-3">
          <p>You must be logged in to post a comment!</p>
        </div>
      }
      <app-comment-list [comments]="comments$ | async" [allowDelete]="isAdmin$ | async" (onDelete)="deleteComment($event)"/>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentBoxComponent {
  private commentService = inject(CommentService);
  private auth = inject(AuthService);

  slug = input.required<string>();
  user$ = this.auth.user$;
  isAdmin$ = this.auth.isAdmin$;
  error = signal<string>(null);
  comments$: Observable<Comment[]>;

  commentForm = new FormGroup({
    text: new FormControl('', emptyValidator()),
  });

  findComments = effect(() => {
    this.comments$ = this.commentService.findAll(this.slug());
  });

  async addComment() {
    try { 
      if (this.commentForm.valid) {
        const user = await firstValueFrom(this.user$);
        const comment = createComment({ 
          slug: this.slug(),
          displayName: user.displayName,
          photoURL: user.photoURL,
          text: this.commentForm.value.text,
        });
        await this.commentService.add(comment);
        this.commentForm.reset();
      }
    }
    catch (e) {
      this.error.set(e.message);
    }
  }

  async deleteComment(comment: Comment) {
    try {
      await this.commentService.delete(comment);
    }
    catch (e) {
      this.error.set(e.message);
    }
  }
}

export function emptyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isEmpty = /^\s*$/.test(control.value);
    return isEmpty ? { value: control.value } : null ;
  }
}
