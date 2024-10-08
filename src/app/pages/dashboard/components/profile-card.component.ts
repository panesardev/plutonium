import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { AuthUser } from '@app/auth/auth.interface';
import { FallbackImageDirective } from '@app/shared/directives/fallback-image.directive';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [
    FallbackImageDirective,
  ],
  template: `
    @if (user(); as user) {
      <div class="card grid md:grid-cols-2 custom-shadow select-none max-w-2xl gap-6 md:gap-4 mx-auto mb-12">
        <div>
          <div class="flex items-center gap-3 mb-6">
            <img class="rounded-full w-8" [src]="user.photoURL" [alt]="user.displayName" fallback="/icons/user.png">
            <span class="text-primary font-heading text-2xl">{{ user.displayName }}</span>
          </div>
          <div class="grid gap-2">
            <div class="grid md:flex items-center gap-2">
              <div class="alert alert-primary">{{ user.email }}</div>
              @if (user.emailVerified) {
                <div class="alert alert-success flex items-center gap-2">
                  <span>Verified</span>
                  <svg fill="currentColor" class="size-3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 507.506 507.506" style="enable-background:new 0 0 507.506 507.506;" xml:space="preserve"><g><path d="M163.865,436.934c-14.406,0.006-28.222-5.72-38.4-15.915L9.369,304.966c-12.492-12.496-12.492-32.752,0-45.248l0,0   c12.496-12.492,32.752-12.492,45.248,0l109.248,109.248L452.889,79.942c12.496-12.492,32.752-12.492,45.248,0l0,0   c12.492,12.496,12.492,32.752,0,45.248L202.265,421.019C192.087,431.214,178.271,436.94,163.865,436.934z"/></g></svg>
                </div>
              }
              @else {
                <div class="alert alert-danger flex items-center gap-2">
                  <span>Not verified</span>
                  <svg class="size-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z"/></svg>
                </div>
              }
            </div>
            <div class="alert alert-primary">Joined {{ user.created }}</div>
          </div>
        </div>
        <div class="flex justify-end items-center h-fit gap-6">
          <button class="btn-danger" (click)="logout.emit()">Logout</button>
        </div>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCardComponent {
  user = input.required<AuthUser>();
  logout = output<void>();
}
