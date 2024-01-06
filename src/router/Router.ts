import { createContext } from "../elements";
import { Effect, State } from "../reactive";
import { Route } from "./Route";
import { getPathParts } from "./getPathParts";
import { matchRoutes } from "./matchRoutes";
import { RouteMatch, RouterConfig, RouterNavigateOptions, To } from "./types";

export class Router {
  constructor(config: RouterConfig) {
    this.root = new Route("root", config.root);
    this.history = config.history;
    this.location = new State(this.history.location);

    new Effect([this.location], () => {
      const parts = getPathParts(this.location.value.url.pathname);

      // index
      if (parts.length === 0) {
        this.matchedRoutes.forEach((rm) => {
          rm.route.isMatch.value = false;
          rm.route.params.value = emptyObject;
        });
        this.matchedRoutes = [];
      }
      //
      else {
        const prevMatched = this.matchedRoutes;
        this.matchedRoutes = matchRoutes(parts, this.root.routes);

        // set to false for routes no longer matched
        prevMatched.forEach((rm) => {
          const isMatched = this.matchedRoutes.find(
            (r) => r.route === rm.route
          );

          if (!isMatched) {
            rm.route.isMatch.value = false;
            rm.route.params.value = emptyObject;
          }
        });

        // set to true for newly matched routes
        this.matchedRoutes.forEach((rm) => {
          if (rm.route.isParam) {
            rm.route.params.value = {
              [`${rm.route.key.slice(1)}`]: rm.param,
            } as any;
          }
          rm.route.isMatch.value = true;
        });
      }
    });
  }
  root;
  location;
  history;
  matchedRoutes: RouteMatch[] = [];

  navigate(to: To, options?: RouterNavigateOptions) {
    if (options?.replace) {
      this.history.replace(this.location.value, options.state);
    }
    //
    else {
      this.history.push(this.location.value, options?.state);
    }
  }
}

export const RouterContext = createContext<Router>();

const emptyObject = {};
