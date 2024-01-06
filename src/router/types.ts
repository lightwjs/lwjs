import { LwNode } from "../types";
import { Route } from "./Route";

export type RouterNavigateOptions<State = any> = {
  state?: State;
  replace?: boolean;
};

// export type RouterHistory = {
//   readonly action: HistoryAction;
//   readonly location: RouterLocation;
//   createHref(to: To): string;
//   createUrl(to: To): URL;
//   encodeLocation(to: To): Path;
//   push(to: To, state?: any): void;
//   replace(to: To, state?: any): void;
//   go(delta: number): void;
//   listen(listener: HistoryListener): void;
// };

export type RouterHistory = {
  listen(listener: HistoryListener): void;
};

export type RouterConfig = {
  /** Top level routes */
  root: RouteConfig;
  history: RouterHistory;
};

export type RouteConfig = {
  render?: () => LwNode;
  routes?: Record<string, RouteConfig>;
};

export type RouteMatch = {
  route: Route;
  param: string | undefined;
};

export type HistoryListener = (args: {
  action: HistoryAction;
  location: RouterLocation;
  delta: number | null;
}) => void;

export type Path = {
  pathname: string;
  search: string;
  hash: string;
};

export type HistoryAction = "pop" | "push" | "replace";

export type RouterLocation<State = any> = Path & {
  key: string;
  state: State;
};

export type To = string | Partial<Path>;

export type HistoryState = {
  usr: any;
  key?: string;
  idx: number;
};
