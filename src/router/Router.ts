import { createContext } from "../elements";
import { Effect, Signal } from "../reactive";
import { Renderer, RouteConfig, RouterConfig } from "../types";
import { matchRoutes } from "./matchRoutes";
import { comparePaths } from "./path";
import { Route } from "./Route";
import { RouterLocation, RouterNavigateOptions } from "./types";

export class Router {
  constructor(config: RouterConfig, renderer: Renderer) {
    this.history = config.createHistory();
    this.location = new Signal<RouterLocation>(
      {
        url: new URL(this.history.getCurrentUrl()),
        state: history.state,
      },
      renderer.ctx
    );
    this.renderer = renderer;
    this.routes = this.createRoutes(config.routes);
    this.match = new Signal<{ route: Route; params: any } | null>(
      null,
      renderer.ctx
    );

    window.addEventListener("popstate", (e) => {
      this.location.value = {
        url: new URL(this.history.getCurrentUrl()),
        state: e.state,
      };
    });

    new Effect(() => {
      const result = matchRoutes(this.location.value.url.pathname, this.routes);
      this.match.value = result
        ? { route: result.route, params: result.params ?? {} }
        : null;
    }, renderer.ctx) ?? null;
  }
  location;
  routes;
  renderer;
  history;
  match;

  createRoutes(routesConfig: RouteConfig[]) {
    return routesConfig
      .map((rc, index) => new Route(rc, index, this))
      .sort((a, b) => comparePaths(a.path, b.path));
  }

  navigate(path: string, options?: RouterNavigateOptions) {
    const newUrl = new URL(this.location.value.url);
    newUrl.pathname = path;
    this.location.value = {
      url: newUrl,
      state: options?.state,
    };
    if (options?.replace) {
      this.history.replace(this.location.value);
    }
    //
    else {
      this.history.push(this.location.value);
    }
  }
}

export const RouterContext = createContext<Router>();
