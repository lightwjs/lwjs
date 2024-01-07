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

  setNode(node: LwNode) {
    this.node = node;
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

type RouteOptions<Params> = {
  path: (p: Path<Params>) => Path<Params>;
};
