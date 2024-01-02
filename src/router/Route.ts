import { createContext, getContext, show } from "../elements";
import { State } from "../reactive";
import { LwNode } from "../types";
import { Outlet } from "./Outlet";
import { RouteConfig } from "./types";

export class Route {
  constructor(key: string, route: RouteConfig) {
    this.key = key;
    this.isParam = this.key.indexOf(":") === 0;
    this.renderFn = route.render ?? defaultRenderFn;
    this.isMatch = new State(key === "root");
    this.params = new State<Record<string, string> | undefined>(
      key === "root" ? {} : undefined
    );
    if (route.routes) {
      const keys = Object.keys(route.routes);
      this.routes = keys.map((key) => new Route(key, route.routes![key]));
    }
  }
  key;
  renderFn;
  isMatch;
  params;
  isParam;
  routes: Route[] = [];

  render(): LwNode {
    return RouteContext.provider(
      {
        value: {
          route: this,
          params: this.params,
        },
      },
      show(this.isMatch, this.renderFn())
    );
  }
}

const defaultRenderFn = () => Outlet();

export const RouteContext = createContext<RouteContextValue>();

export const getParams = () => getContext(RouteContext).params;

type RouteContextValue = {
  route: Route;
  params: State<Record<string, string> | undefined>;
};
