import { ShowElement } from "../../elements";
import { syncEffect } from "../../reactive";
import { createDomNodes } from "../createDomNodes";
import { findNextNode } from "../findNextNode";
import { removeShowElements } from "./removeShowElements";

export const createShowElement = (el: ShowElement) => {
  let prevCond: boolean | undefined;

  syncEffect(() => {
    const cond = !!el.reactive.value;

    el.children = cond ? el.yesElements : el.noElements;

    if (prevCond != null && cond !== prevCond) {
      const elsToBeRemoved = cond ? el.noElements : el.yesElements;
      removeShowElements(elsToBeRemoved);
      const nodes = createDomNodes(el.children, el);
      el.nodes = nodes;
      const nextNode = findNextNode(el);
      const parentNode = el.htmlParent?.nodes?.[0];

      if (parentNode) {
        for (const n of nodes) {
          parentNode.insertBefore(n, nextNode ?? null);
        }
      }
    }
    prevCond = cond;
  });
  return createDomNodes(el.children, el);
};
