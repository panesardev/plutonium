import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { AuthService } from "../services/auth.service";

export const AuthGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const user = await firstValueFrom(auth.user$);
  return !!user;
};
