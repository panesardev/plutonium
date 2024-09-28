import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Comment } from '../comment.interface';
import { ImageErrorDirective } from '@shared/directives/image-error.directive';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [
    ImageErrorDirective,
  ],
  template: `
    <div class="grid gap-6">
      @for (comment of comments(); track comment.id) {
        <div class="bg-neutral grid grid-cols-[2rem_1fr] rounded gap-4 md:gap-6 p-4 md:p-6">
          <div>
            <img class="w-8 h-8 rounded-full" [src]="comment.photoURL" onError="/icons/user.png" [alt]="comment.displayName">
          </div>
          <div>
            <h1 class="flex justify-between gap-4 mb-1">
              <span>{{ comment.displayName }}</span>
              <span class="text-xs text-slate-400">{{ parseDate(comment.created) }}</span>
            </h1>
            <p class="text-slate-600 mb-4">{{ comment.text }}</p>
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

