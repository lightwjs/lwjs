import { TYPE_MAP } from "../constants";
import { ProviderElement, ReactiveElement, TextElement } from "../elements";
import { syncEffect } from "../reactive";
import { LwElement } from "../types";
import { createComponentElement } from "./createComponentElement";
import { createHeadElement } from "./createHeadElement";
import { createHtmlElement } from "./html";
import { createList } from "./list";
import { createShowElement } from "./show";
import { DomNode } from "./types";

const createTextElement = (el: TextElement) => {
  return new Text(String(el.text));
};

const createReactiveElement = (el: ReactiveElement) => {
  const node = new Text(el.reactive.value);

  syncEffect(() => {
    node.textContent = el.reactive.value;
  });

  return node;
};

const createProviderElement = (el: ProviderElement<any>) => {
  return createDomNodes(el.children, el);
};

const CREATE_MAP = {
  [TYPE_MAP.html]: createHtmlElement,
  [TYPE_MAP.txt]: createTextElement,
  [TYPE_MAP.reactive]: createReactiveElement,
  [TYPE_MAP.show]: createShowElement,
  [TYPE_MAP.list]: createList,
  [TYPE_MAP.provider]: createProviderElement,
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
    el.nodes = Array.isArray(result) ? result : [result];

    if (Array.isArray(result)) {
      domNodes.push(...result);
    }
    //
    else {
      domNodes.push(result);
    }
  }

  return domNodes;
};
