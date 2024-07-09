import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { derivedAsync } from 'ngxtension/derived-async';
import { AuthService } from '../../../auth/auth.service';
import { Comment, CommentFormValue } from '../comment.interface';
import { CommentService } from '../comment.service';
import { createComment } from '../comment.utilities';
import { CommentFormComponent } from './comment-form.component';
import { CommentListComponent } from './comment-list.component';

@Component({
  selector: 'app-comment-box',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommentListComponent,
    CommentFormComponent,
    RouterLink,
  ],
  template: `
    <div class="bg-white md:rounded-lg p-4 md:p-8">
      <h1 class="font-bold text-2xl text-center text-primary mb-8">Comments</h1>
      <div class="mb-8">
        @if (user()) {
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
            <button class="mx-auto px-8" routerLink="/auth">Login</button>
          </div>
        }
      </div>

      <app-comment-list [comments]="comments()" [canDelete]="isAdmin()" (onDelete)="deleteComment($event)"/>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentBoxComponent {
  private auth = inject(AuthService);
  private commentService = inject(CommentService);

  slug = input.required<string>();
  
  user = derivedAsync(() => this.auth.user$);
  isAdmin = derivedAsync(() => this.auth.isAdmin$);
  comments = derivedAsync(() => this.commentService.findAll(this.slug()));
  
  error = signal<string>(null);

  async addComment(value: CommentFormValue) {
    const comment = createComment({ 
      slug: this.slug(),
      displayName: this.user().displayName,
      photoURL: this.user().photoURL,
      text: value.text,
    });

    await this.commentService.add(comment)
      .catch(e => this.error.set(e.message));
  }

  async deleteComment(comment: Comment) {
    await this.commentService.delete(comment)
      .catch(e => this.error.set(e.message));
  }
}

