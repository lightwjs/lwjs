import { createContext, show } from "../elements";
import { Computed } from "../reactive";
import { RouteConfig } from "../types";
import { Router } from "./Router";
import { RouteMatch } from "./types";

export class Route {
  constructor(config: RouteConfig, index: number, router: Router) {
    this.path = config.path;
    this.path.routeIndex = index;
    this.component = config.component;
    this.router = router;
    this.match = new Computed<RouteMatch | null>(() => {
      const routerMatch = router.match.value;
      if (routerMatch && routerMatch.route === this)
        return {
          params: routerMatch.params,
        };

      return null;
    }, router.renderer.ctx);
  }
  path;
  component;
  match;
  router;

  render() {
    return RouteContext.provider(
      { value: {} },
      show(this.match, this.component())
    );
  }
}

export const RouteContext = createContext();
