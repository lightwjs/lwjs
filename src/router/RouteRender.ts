import { component, show } from "../elements";
import { Route } from "./Route";
import { getRouterContext } from "./Router";

export const RouteRender = component<{ route: Route<any> }>(({ route }) => {
  const router = getRouterContext();

  return show(router.matches.get(route)!, route.node);
});
