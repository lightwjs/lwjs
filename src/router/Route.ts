import { component, createContext, show } from "../elements";
import { Computed } from "../reactive";
import { LwNode } from "../types";
import { Path } from "./Path";
import { getRouterContext } from "./Router";

export class Route<Params = void> {
  constructor(options: RouteOptions<Params>) {
    this.path = options.path(new Path<Params>());
  }
  path;
  node: LwNode;

  toRender(node: LwNode) {
    this.node = node;
  }

  render() {
    return RouteContext.provider(
      { value: this },
      RouteComponent({ route: this })
    );
  }

  getParams() {
    const router = getRouterContext();

    const match = router.matches.get(this);

    if (!match) {
      throw new Error("Route wasn't passed in the Router constructor");
    }

    return new Computed<Params>([match], () => match.value?.params ?? {});
  }

  toHref(params: Params) {
    return this.path.toHref(params);
  }
}

const RouteContext = createContext<Route<any>>();

const RouteComponent = component<{ route: Route }>(({ route }) => {
  const router = getRouterContext();

  return show(router.matches.get(route)!, route.node);
});

type RouteOptions<Params> = {
  path: (p: Path<Params>) => Path<Params>;
};
