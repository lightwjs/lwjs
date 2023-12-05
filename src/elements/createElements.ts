import { LwElement, LwNode } from "../types";
import {
  isEmptyNode,
  isLwElement,
  isReactiveValue,
  isTextNode,
} from "../utils";
import { ReactiveElement } from "./ReactiveElement";
import { TextElement } from "./TextElement";

export const createElements = (...nodes: LwNode[]) => {
  const els: LwElement[] = [];

  const flatNodes = nodes.flat(Infinity as 1);

  for (const node of flatNodes) {
    if (isEmptyNode(node)) {
      continue;
    }
    //
    else if (isTextNode(node)) {
      els.push(new TextElement(node));
    }
    //
    else if (isReactiveValue(node)) {
      els.push(new ReactiveElement(node));
    }
    //
    else if (isLwElement(node)) {
      els.push(node);
    }
  }

  return els;
};
