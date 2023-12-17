import { ComponentApi, createContext, show } from "../elements";
import { Computed } from "../reactive";
import { RouteConfig } from "../types";
import { Router } from "./Router";

export class Route {
  constructor(config: RouteConfig, originalIndex: number, router: Router) {
    this.path = config.path;
    this.originalIndex = originalIndex;
    this.component = config.component;
    this.router = router;
    this.params = new Computed(() => {
      const routerMatch = router.match.value;
      if (routerMatch && routerMatch.route === this) return routerMatch.params;
      return null;
    }, router.renderer.ctx);
  }
  path;
  component;
  params;
  router;
  originalIndex;

  render() {
    return RouteContext.provider(
      {
        value: {
          params: this.params,
        },
      },
      show(this.params, this.component())
    );
  }
}

export const RouteContext = createContext<RouteContextValue>();

type RouteContextValue = {
  params: Computed<Record<string, any>>;
};

export const getParams = <Params extends Record<string, any>>(
  $: ComponentApi<any>
) => $.getContext(RouteContext).params as Computed<Params>;
