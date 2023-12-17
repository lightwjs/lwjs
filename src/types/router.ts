import { ComponentFactoryFn } from "../elements";
import { Path, RouterHistory } from "../router";

export type RouterConfig = {
  /** Top level routes */
  routes: RouteConfig[];
  createHistory: () => RouterHistory;
};

export type RouteConfig = {
  path: Path<any>;
  /** Component to render when Route is matched */
  component: ComponentFactoryFn<any>;
};
