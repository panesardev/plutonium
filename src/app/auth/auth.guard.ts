import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { map } from "rxjs";
import { AuthService } from "./auth.service";
import { toObservable } from "@angular/core/rxjs-interop";

export const AuthGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  return toObservable(auth.user).pipe(
    map(user => !!user),
  );
}
