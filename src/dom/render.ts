import { HtmlElement, createElements } from "../elements";
import { LwNode } from "../types";
import { createDomNodes } from "./createDomNodes";

export const render = (node: LwNode, container: HTMLElement) => {
  const els = createElements(node);

  const containerEl = new HtmlElement(container.tagName.toLowerCase(), {}, els);
  containerEl.nodes = [container];

  const domNodes = createDomNodes(els, containerEl);

  container.append(...domNodes);
};
