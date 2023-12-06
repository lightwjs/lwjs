import { TYPE_MAP } from "../constants";
import { ProviderElement, ReactiveElement, TextElement } from "../elements";
import { syncEffect } from "../reactive";
import { LwElement } from "../types";
import { createComponentElement } from "./createComponentDom";
import { createHeadElement } from "./createHeadElementDom";
import { createHtmlElementDom } from "./html";
import { createListDom } from "./list";
import { createShowDom } from "./show";
import { DomNode } from "./types";

const createTextElementDom = (el: TextElement) => {
  el.nodes = [document.createTextNode(String(el.text))];
};

const createReactiveElementDom = (el: ReactiveElement) => {
  const node = document.createTextNode(el.reactive.value);

  const eff = syncEffect(() => {
    node.textContent = el.reactive.value;
  });

  el.nodes = [node];
  el.effects = [eff];
};

const createProviderElementDom = (el: ProviderElement<any>) => {
  el.nodes = createDomNodes(el.children, el);
};

const CREATE_MAP = {
  [TYPE_MAP.html]: createHtmlElementDom,
  [TYPE_MAP.txt]: createTextElementDom,
  [TYPE_MAP.reactive]: createReactiveElementDom,
  [TYPE_MAP.show]: createShowDom,
  [TYPE_MAP.list]: createListDom,
  [TYPE_MAP.provider]: createProviderElementDom,
  [TYPE_MAP.component]: createComponentElement,
  [TYPE_MAP.head]: createHeadElement,
};

export const createDomNodes = (
  elements: LwElement[],
  parent: LwElement
): DomNode[] => {
  const domNodes: DomNode[] = [];

  let result;
  const len = elements.length;

  for (let i = 0; i < len; i++) {
    const prevEl = elements[i - 1];
    const el = elements[i];
    if (prevEl) {
      prevEl.nextEl = el;
    }

    el.parent = parent;
    if (parent.type === TYPE_MAP.html) {
      el.htmlParent = parent;
    }
    //
    else {
      el.htmlParent = parent.htmlParent;
    }

    result = CREATE_MAP[el.type](el as any);
    domNodes.push(...(el.nodes ?? []));
  }

  return domNodes;
};
