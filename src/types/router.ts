import { ComponentFactoryFn } from "../elements";

export type RouterConfig = {
  routes: RouteConfig[];
};

type RouteConfig = {
  path: string;
  component: ComponentFactoryFn<any>;
};
