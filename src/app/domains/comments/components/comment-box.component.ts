import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { AuthService } from '@app/auth/auth.service';
import { CommentFormValue } from '../comment.interface';
import { CommentService } from '../comment.service';
import { createComment } from '../comment.utils';
import { CommentFormComponent } from './comment-form.component';
import { CommentListComponent } from './comment-list.component';
import { AsyncPipe } from '@angular/common';
import { firstValueFrom, switchMap } from 'rxjs';

@Component({
  selector: 'app-comment-box',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommentListComponent,
    CommentFormComponent,
    RouterLink,
    AsyncPipe,
  ],
  template: `
    <div class="card mb-4">
      <h1 class="font-bold text-2xl text-center text-primary mb-8">Comments</h1>

      @if (user$ | async) {
        @if (error()) {
          <div class="alert alert-danger cursor-pointer mb-6" (click)="error.set(null)">
            <span>{{ error() }}</span>
          </div>
        }
        
        <app-comment-form (onSubmit)="addComment($event)"/>
      }
      @else {
        <div>
          <p class="text-center mb-4">You must be logged in to post a comment!</p>
          <button class="mx-auto px-8" routerLink="/login">Login</button>
        </div>
      }
    </div>

    <app-comment-list [comments]="comments$ | async" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentBoxComponent {
  private auth = inject(AuthService);
  private commentService = inject(CommentService);

  slug = input.required<string>();
  
  user$ = this.auth.user$;
  comments$ = toObservable(this.slug).pipe(
    switchMap(slug => this.commentService.findAll(slug)),
  );
  
  error = signal<string>(null);

  async addComment(value: CommentFormValue) {
    const user = await firstValueFrom(this.user$);

    const comment = createComment({ 
      slug: this.slug(),
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: value.text,
    });

    await this.commentService.create(comment)
      .catch(e => this.error.set(e.message));
  }
}

