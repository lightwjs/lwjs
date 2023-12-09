import { TYPE_MAP } from "../constants";
import { HtmlElement, ProviderElement, createElements } from "../elements";
import { ReactiveContext } from "../reactive";
import { LwElement, LwNode } from "../types";
import { isLwObjectOfType } from "../utils";
import { CssRenderer } from "./CssRenderer";
import { createComponentElementDom } from "./component";
import { createHeadElementDom } from "./head";
import { createHtmlElementDom } from "./html";
import { createListElementDom } from "./list";
import { createReactiveElementDom } from "./reactive";
import { createShowElementDom } from "./show";
import { createTextElementDom } from "./text";
import { DomNode } from "./types";

export class DomRenderer {
  constructor() {
    this.cssRenderer = new CssRenderer();
    this.reactiveContext = new ReactiveContext();
  }
  cssRenderer;
  reactiveContext;

  create(elements: LwElement[], parent: LwElement) {
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
      if (isLwObjectOfType(parent, "html")) {
        el.htmlParent = parent;
      }
      //
      else {
        el.htmlParent = parent.htmlParent;
      }

      result = CREATE_EL_DOM_MAP[el.type](el as any, this);
      domNodes.push(...(el.nodes ?? []));
    }

    return domNodes;
  }

  render(node: LwNode, container: HTMLElement) {
    const els = createElements(node);

    const containerEl = new HtmlElement(
      container.tagName.toLowerCase(),
      {},
      els
    );
    containerEl.nodes = [container];

    const domNodes = this.create(els, containerEl);

    container.append(...domNodes);
  }
}

const CREATE_EL_DOM_MAP = {
  [TYPE_MAP.html]: createHtmlElementDom,
  [TYPE_MAP.txt]: createTextElementDom,
  [TYPE_MAP.reactive]: createReactiveElementDom,
  [TYPE_MAP.show]: createShowElementDom,
  [TYPE_MAP.list]: createListElementDom,
  [TYPE_MAP.provider]: (el: ProviderElement<any>, renderer: DomRenderer) =>
    (el.nodes = renderer.create(el.children, el)),
  [TYPE_MAP.component]: createComponentElementDom,
  [TYPE_MAP.head]: createHeadElementDom,
};
