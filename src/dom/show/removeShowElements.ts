import { TYPE_MAP } from "../../constants";
import { LwElement } from "../../types";

export const removeShowElements = (els: LwElement[]) => {
  for (const e of els) {
    if (e.type === TYPE_MAP.component) {
      // for (const eff of e.effects) {
      //   eff.usrCleanup?.();
      //   eff.cleanup?.();
      // }
    }
    if (e.nodes == null) continue;
    for (const node of e.nodes) {
      node.remove();
    }
    e.nodes = [];
  }
};
