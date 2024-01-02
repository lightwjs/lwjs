import { createContext } from "../elements";
import { Effect, State } from "../reactive";
import { Renderer } from "../types";
import { Route } from "./Route";
import { matchRoutes } from "./matchRoutes";
import {
  RouteMatch,
  RouterConfig,
  RouterLocation,
  RouterNavigateOptions,
} from "./types";

export class Router {
  constructor(config: RouterConfig, renderer: Renderer) {
    this.root = new Route("root", config.root);
    this.history = config.createHistory(this);
    this.location = new State<RouterLocation>({
      url: new URL(this.history.getCurrentUrl()),
      state: history.state,
    });
    this.renderer = renderer;

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
  renderer;
  history;
  matchedRoutes: RouteMatch[] = [];

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

const getPathParts = (path: string) => {
  let parts = path.split("/").filter(Boolean);
  // remove leading slash
  if (parts[0] === "/") {
    parts = parts.slice(1);
  }
  return parts;
};

export const RouterContext = createContext<Router>();

const emptyObject = {};
