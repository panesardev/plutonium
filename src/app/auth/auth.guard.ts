import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { AuthService } from "./auth.service";

export const AuthGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  return auth.isAuthenticated$;
}
