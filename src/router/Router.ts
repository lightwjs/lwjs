import { createContext, getContext } from "../elements";
import { Effect, State } from "../reactive";
import { LwNode } from "../types";
import { Route } from "./Route";
import { matchRoute } from "./matchRoute";
import { RouteMatch, RouterHistory, RouterLocation } from "./types";

export class Router {
  constructor(options: RouterOptions) {
    this.history = options.history;
    this.location = new State(this.history.location);
    this.history.listen((location) => {
      this.location.value = location;
    });
    for (const route of options.routes) {
      this.matches.set(route, new State(undefined));
    }

    new Effect([this.location], () => {
      options.routes.forEach((r) => {
        const match = matchRoute(this.location.value.url, r);
        this.matches.get(r)!.value = match;
      });
    });
  }
  history;
  location;
  matches = new Map<Route<any>, State<RouteMatch<any> | undefined>>();

  provider(...nodes: LwNode[]) {
    return RouterContext.provider(
      {
        value: this,
      },
      nodes
    );
  }

  navigate(path: string, options?: NavigateOptions) {
    const newUrl = new URL(this.location.value.url);
    newUrl.pathname = path;

    const newLocation: RouterLocation = {
      url: newUrl,
    };

    if (options?.replace) {
      this.history.replace(newLocation);
    }
    //
    else {
      this.history.push(newLocation);
    }
    this.location.value = newLocation;
  }
}

type RouterOptions = {
  routes: Route<any>[];
  history: RouterHistory;
};

type NavigateOptions = {
  replace?: boolean;
};

const RouterContext = createContext<Router>();

export const getRouterContext = () => getContext(RouterContext);
