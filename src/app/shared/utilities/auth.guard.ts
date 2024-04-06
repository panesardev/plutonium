import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { map, tap } from "rxjs";
import { AuthService } from "../services/auth.service";

export const AuthGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.user$.pipe(
    map(user => !!user),
    tap(loggedIn => !loggedIn && router.navigateByUrl('/')),
  );
};
