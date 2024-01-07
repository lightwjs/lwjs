import { ShowElement } from "../elements";
import { Effect } from "../reactive";
import { createDomNodes } from "./createDomNodes";
import { findNextNode } from "./findNextNode";
import { getDomParent } from "./getDomParent";
import { removeElement } from "./removeElement";

export const createShowElementDom = (el: ShowElement) => {
  let prevCond: boolean | undefined;

  const eff = new Effect([el.reactive], () => {
    const cond = !!el.reactive.value;

    el.children = cond ? el.yesElements : el.noElements;

    if (prevCond != null && cond !== prevCond) {
      const elsToBeRemoved = cond ? el.noElements : el.yesElements;
      for (const el of elsToBeRemoved) {
        removeElement(el);
      }

      if (el.children.length > 0) {
        const nodes = createDomNodes(el.children, el);
        const nextNode = findNextNode(el);
        const domParent = getDomParent(el);

        if (domParent) {
          for (const n of nodes) {
            domParent.insertBefore(n, nextNode ?? null);
          }
        }
      }
    }
    prevCond = cond;
  });

  el.effects = [eff];
  return createDomNodes(el.children, el);
};
