import { LwElement } from "../types";
import { isLwObjectOfType, isParentElement } from "../utils";

export const removeElement = (el: LwElement) => {
  if (el.nodes) {
    for (const node of el.nodes) {
      node.remove();
    }
    el.nodes.length = 0;
  }
  if (el.effects) {
    for (const eff of el.effects) {
      eff.dispose();
    }
    el.effects.length = 0;
  }
  if (isParentElement(el)) {
    for (const child of el.children) {
      removeElement(child);
    }
    if (!isLwObjectOfType(el, "html") && el.nodes) {
      el.nodes.length = 0;
    }
  }
};
