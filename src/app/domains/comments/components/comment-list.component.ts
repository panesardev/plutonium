import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Comment } from '../comment.interface';
import { FallbackImageDirective } from '@app/shared/directives/fallback-image.directive';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [
    FallbackImageDirective,
  ],
  template: `
    <div class="grid gap-4">
      @for (comment of comments(); track comment.id) {
        <div class="card grid grid-cols-[2rem_1fr] gap-4 md:gap-6 p-4 md:p-6">
          <img class="rounded-full size-8" [src]="comment.photoURL" fallback="/icons/user.png" [alt]="comment.displayName">
          <div>
            <h1 class="flex justify-between items-center gap-4 mb-1">
              <span class="font-bold">{{ comment.displayName }}</span>
              <span class="text-xs text-slate-400">{{ parseDate(comment.created) }}</span>
            </h1>
            <p class="mb-1">{{ comment.text }}</p>
          </div>
        </div>
      }
      @empty {
        <div class="text-center px-6">
          <p>Be first to comment on this article!</p>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentListComponent {
  comments = input.required<Comment[]>();
  
  parseDate(str: string): string {
    const date = new Date(str);
    return date.toLocaleDateString();
  }
}

