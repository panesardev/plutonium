import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, input, output, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom, Observable } from 'rxjs';
import { Comment, CommentFormValue } from '../comment.interface';
import { CommentService } from '../comment.service';
import { createComment } from '../comment.utilities';
import { CommentFormComponent } from './comment-form.component';
import { CommentListComponent } from './comment-list.component';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-comment-box',
  standalone: true,
  providers: [AuthService],
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    CommentListComponent,
    CommentFormComponent,
  ],
  template: `
    <div class="p-4 md:p-8">
      <h1 class="font-bold text-2xl text-center text-primary mb-8">Comments</h1>
      <div class="mb-8">
        @if (user$ | async) {
          @if (error()) {
            <div class="flex items-center gap-3 bg-red-100 text-red-500 rounded mb-4 px-4 py-3 cursor-pointer" (click)="error.set(null)">
              <span>{{ error() }}</span>
            </div>
          }
          
          <app-comment-form (onSubmit)="addComment($event)"/>
        }
        @else {
          <div class="mb-4">
            <p class="text-center mb-4">You must be logged in to post a comment!</p>
            <button class="btn primary mx-auto px-8" (click)="onLogin.emit()">Login</button>
          </div>
        }
      </div>

      <app-comment-list [comments]="comments$ | async" [canDelete]="isAdmin$ | async" (onDelete)="deleteComment($event)"/>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentBoxComponent {
  private commentService = inject(CommentService);
  private auth = inject(AuthService);

  slug = input.required<string>();
  onLogin = output<void>();
  
  user$ = this.auth.user$;
  isAdmin$ = this.auth.isAdmin$;
  error = signal<string>(null);
  comments$: Observable<Comment[]>;

  findComments = effect(() => {
    this.comments$ = this.commentService.findAll(this.slug());
  });

  async addComment(value: CommentFormValue) {
    try { 
      const user = await firstValueFrom(this.user$);
      const comment = createComment({ 
        slug: this.slug(),
        displayName: user.displayName,
        photoURL: user.photoURL,
        text: value.text,
      });

      await this.commentService.add(comment);
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

