import { Route } from "./Route";
import { RouteMatch } from "./types";

export const matchRoutes = (parts: string[], routes: Route[]) => {
  const part = parts[0];
  const matchedRoutes: RouteMatch[] = [];

  for (const route of routes) {
    let isMatch = false;
    let param: string | undefined;

    if (part) {
      if (route.isParam) {
        isMatch = true;
        param = part;
      }
      //
      else {
        isMatch = route.key === part;
      }
    }

    if (isMatch) {
      matchedRoutes.push(
        {
          route,
          param,
        },
        ...matchRoutes(parts.slice(1), route.routes)
      );
    }
  }

  return matchedRoutes;
};
