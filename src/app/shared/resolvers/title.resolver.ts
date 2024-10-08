import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { BRAND } from "@app/app.constants";

export const TitleResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  const path = route.routeConfig.path;
  let title = 'Home';

  if (path) {
    title = path.charAt(0).toUpperCase() + path.slice(1);
  }
  
  if (path === '**') {
    title = 'Page not found';
  }
  
  return `${title} | ${BRAND}`;
};
