import { component } from "../elements";
import { RouterContext } from "./Router";

/**
 * Renders router output.
 */
export const Outlet = component(($) => {
  const router = $.getContext(RouterContext);

  return router.routes.map((r) => r.render());
});
