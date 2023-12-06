import { LwNode } from "../types";
import { isPlainObject } from "./isPlainObject";

export const handlePropsArg = (propsOrNode: any, nodes: LwNode[]) => {
  let props = {};
  let nodesToPass: LwNode[] = [];

  if (isPlainObject(propsOrNode)) {
    props = propsOrNode;
  }
  //
  else {
    nodesToPass = [propsOrNode];
  }

  nodesToPass = [...nodesToPass, ...nodes];

  return {
    props,
    nodesToPass,
  };
};
