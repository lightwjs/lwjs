import { component, getContext } from "../elements";
import { RouteContext } from "./Route";
import { RouterContext } from "./Router";

/**
 * Renders router output.
 */
export const Outlet = component(() => {
  const router = getContext(RouterContext);
  const routeContext = getContext(RouteContext);

  if (routeContext) {
    return routeContext.route.routes.map((r) => r.render());
  } else {
    return router.root.render();
  }
});
