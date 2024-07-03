import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { map } from "rxjs";
import { AuthService } from "./auth.service";

export const AuthGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  return auth.user$.pipe(
    map(user => !!user),
  );
}
