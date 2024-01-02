import { LwNode } from "../types";
import { Route } from "./Route";
import { Router } from "./Router";

export type RouterNavigateOptions<State = any> = {
  state?: State;
  replace?: boolean;
};

export type RouterLocation = {
  url: URL;
  state: any;
};

export interface RouterHistory {
  getCurrentUrl: () => string;
  push: (location: RouterLocation) => void;
  replace: (location: RouterLocation) => void;
}

export type RouterConfig = {
  /** Top level routes */
  root: RouteConfig;
  createHistory: (router: Router) => RouterHistory;
};

export type RouteConfig = {
  render?: () => LwNode;
  routes?: Record<string, RouteConfig>;
};

export type RouteMatch = {
  route: Route;
  param: string | undefined;
};
