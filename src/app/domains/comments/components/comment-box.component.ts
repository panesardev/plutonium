import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom, Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { CommentService } from '../comment.service';
import { Comment, createComment, emptyValidator } from '../comment.interface';

@Component({
  selector: 'app-comment-box',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
  ],
  template: `
    <div class="bg-neutral p-4 md:p-8 rounded">
      <h1 class="font-bold text-2xl text-center text-primary mb-8">Comments</h1>
      <div class="mb-8">
        @if (user$ | async) {
          @if (error()) {
            <div class="flex items-center gap-3 bg-red-100 text-red-500 rounded mb-4 px-4 py-3 cursor-pointer" (click)="error.set(null)">
              <span>{{ error() }}</span>
            </div>
          }
          <form [formGroup]="commentForm" (submit)="addComment()">
            <div class="input mb-6">
              <div class="flex flex-col md:flex-row justify-center items-center gap-4">
                <textarea class="w-full" formControlName="text" placeholder="Write a comment here"></textarea>
                <button class="btn {{ commentForm.invalid ? 'disabled' : 'primary' }}" type="submit" [disabled]="commentForm.invalid">Post</button>
              </div>
            </div>
          </form>
        }
        @else {
          <div class="bg-slate-100 text-slate-600 rounded mb-4 p-4 md:p-6">
            <p class="text-center mb-4">You must be logged in to post a comment!</p>
            <button class="btn primary mx-auto px-8" (click)="onLogin.emit()">Login</button>
          </div>
        }
      </div>
      <div class="grid gap-6">
        @for (comment of comments$ | async; track comment.id) {
          <div class="grid grid-cols-[2rem_1fr] gap-4 md:gap-6 [&:not(:last-child)]:pb-6 [&:not(:last-child)]:border-b-[1px] border-b-slate-300">
            <div>
              <img class="w-8 h-8 rounded-full" [src]="comment.photoURL" [alt]="comment.displayName">
            </div>
            <div>
              <h1 class="font-bold flex justify-between gap-4 mb-1">
                <span>{{ comment.displayName }}</span>
                <span class="font-normal text-xs text-slate-400">{{ parseDate(comment.created) }}</span>
              </h1>
              <p class="text-slate-600">{{ comment.text }}</p>
              @if (isAdmin$ | async) {
                <button class="btn sm red ml-auto" (click)="deleteComment(comment)">Delete</button>
              }
            </div>
          </div>
        }
        @empty {
          <div class="text-center px-6 text-lg">
            <p>Be first to comment on this article!</p>
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentBoxComponent {
  private commentService = inject(CommentService);
  private auth = inject(AuthService);

  slug = input.required<string>();
  onLogin = output<void>();

  commentForm = new FormGroup({
    text: new FormControl('', [Validators.required, emptyValidator()]),
  });
  
  user$ = this.auth.user$;
  isAdmin$ = this.auth.isAdmin$;
  error = signal<string>(null);
  
  comments$: Observable<Comment[]>;

  findComments = effect(() =>
    this.comments$ = this.commentService.findAll(this.slug())
  );

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
  
  parseDate(str: string): string {
    const date = new Date(str);
    return date.toLocaleDateString();
  }
}

