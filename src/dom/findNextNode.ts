import { LwElement } from "../types";
import { DomNode } from "./types";

export const findNextNode = (el: LwElement): DomNode | undefined => {
  let nextEl = el.nextEl;

  while (nextEl) {
    const nextNode = nextEl.nodes?.[0];
    if (nextNode) {
      return nextNode;
    }
    nextEl = nextEl.nextEl;
  }

  if (el.parent && el.parent.htmlParent === el.htmlParent) {
    return findNextNode(el.parent);
  }
};
