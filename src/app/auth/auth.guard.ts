import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { AuthService } from "./auth.service";
import { map, take } from "rxjs";

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  return authService.user$.pipe(
    take(1),
    map(user => !!user),
  );
}
