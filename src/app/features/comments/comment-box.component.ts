import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, input, output, signal } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CommentService } from './comment.service';
import { Comment, createComment } from '../../types/comment.interface';
import { AddCommentComponent } from './add-comment.component';
import { CommentListComponent } from './comment-list.component';

@Component({
  selector: 'app-comment-box',
  standalone: true,
  imports: [
    AsyncPipe,
    AddCommentComponent,
    CommentListComponent,
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
          <app-add-comment (onAdd)="add($event)"/>
        }
        @else {
          <div class="bg-base-100 text-slate-600 rounded mb-4 p-4 md:p-6">
            <p class="text-center mb-4">You must be logged in to post a comment!</p>
            <button class="btn primary mx-auto px-8" (click)="onLogin.emit()">Login</button>
          </div>
        }
      </div>
      <app-comment-list [comments]="comments$ | async" [allowDelete]="isAdmin$ | async" (onDelete)="delete($event)"/>
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

  findComments = effect(() =>
    this.comments$ = this.commentService.findAll(this.slug())
  );

  async add(text: string) {
    try { 
      const user = await firstValueFrom(this.user$);
      const comment = createComment({ 
        slug: this.slug(),
        displayName: user.displayName,
        photoURL: user.photoURL,
        text,
      });
      await this.commentService.add(comment);
    }
    catch (e) {
      this.error.set(e.message);
    }
  }

  async delete(comment: Comment) {
    try {
      await this.commentService.delete(comment);
    }
    catch (e) {
      this.error.set(e.message);
    }
  }
}

