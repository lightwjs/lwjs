import { TYPE_MAP } from "../constants";
import { ProviderElement } from "../elements";
import { LwElement } from "../types";
import { isLwObjectOfType } from "../utils";
import { createComponentElementDom } from "./component";
import { createHeadElementDom } from "./head";
import { createHtmlElementDom } from "./html";
import { createListElementDom } from "./list";
import { createReactiveElementDom } from "./reactive";
import { createShowElementDom } from "./show";
import { createTextElementDom } from "./text";
import { DomNode } from "./types";

export const createDomNodes = (elements: LwElement[], parent: LwElement) => {
  const domNodes: DomNode[] = [];

  const len = elements.length;

  for (let i = 0; i < len; i++) {
    const prevEl = elements[i - 1];
    const el = elements[i];
    if (prevEl) {
      prevEl.nextEl = el;
    }

    el.parent = parent;
    if (isLwObjectOfType(parent, "html")) {
      el.htmlParent = parent;
    }
    //
    else {
      el.htmlParent = parent.htmlParent;
    }

    const nodes = CREATE_EL_DOM_MAP[el.type](el, this);
    domNodes.push(...nodes);
  }

  return domNodes;
};

const CREATE_EL_DOM_MAP: any = {
  [TYPE_MAP.html]: createHtmlElementDom,
  [TYPE_MAP.txt]: createTextElementDom,
  [TYPE_MAP.reactive]: createReactiveElementDom,
  [TYPE_MAP.show]: createShowElementDom,
  [TYPE_MAP.list]: createListElementDom,
  [TYPE_MAP.provider]: (el: ProviderElement<any>) =>
    createDomNodes(el.children, el),
  [TYPE_MAP.component]: createComponentElementDom,
  [TYPE_MAP.head]: createHeadElementDom,
};
