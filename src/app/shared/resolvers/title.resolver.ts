import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";

export const titleResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  const path = route.routeConfig.path;
  let title = 'Home';

  if (path) {
    title = path.charAt(0).toUpperCase() + path.slice(1);
  }

  if (path.includes('-')) {
    title = title.split('-').join(' ');
  }
  
  if (path === '**') {
    title = 'Page not found';
  }
  
  return title;
};
