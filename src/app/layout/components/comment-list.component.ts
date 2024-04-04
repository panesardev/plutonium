import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Comment } from '../../types/comment.interface';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [],
  template: `
    <div class="grid gap-2">
      @for (comment of comments(); track comment.id) {
        <div class="bg-neutral grid grid-cols-[2rem_1fr] gap-4 md:gap-6 p-6 rounded-lg">
          <div>
            <img class="w-8 h-8 rounded-full" [src]="comment.photoURL" [alt]="comment.displayName">
          </div>
          <div>
            <h1 class="font-bold flex justify-between gap-4 mb-1">
              <span>{{ comment.displayName }}</span>
              <span class="font-normal text-xs text-slate-400">{{ parseDate(comment.created) }}</span>
            </h1>
            <p class="text-slate-600">{{ comment.text }}</p>
            @if (allowDelete()) {
              <button class="btn sm red ml-auto" (click)="onDelete.emit(comment)">Delete</button>
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentListComponent {
  comments = input.required<Comment[]>();
  allowDelete = input.required<boolean>();
  onDelete = output<Comment>();

  parseDate(str: string): string {
    const date = new Date(str);
    return date.toLocaleDateString();
  }
}
