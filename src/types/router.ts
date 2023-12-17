import { ComponentFactoryFn } from "../elements";
import { PathConfig, Router, RouterHistory } from "../router";

export type RouterConfig = {
  /** Top level routes */
  routes: RouteConfig[];
  createHistory: (router: Router) => RouterHistory;
};

export type RouteConfig = {
  path: PathConfig<any>;
  /** Component to render when Route is matched */
  component: ComponentFactoryFn<any>;
};
