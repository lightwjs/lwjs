import { HtmlElement, createElements } from "../elements";
import { createDomNodes } from "./createDomNodes";

export const render = (node: any, container: HTMLElement) => {
  const els = createElements(node);

  const containerEl = new HtmlElement(
    container.tagName.toLowerCase(),
    {},
    els,
    false
  );
  containerEl.nodes = [container];

  const domNodes = createDomNodes(els, containerEl);

  container.append(...domNodes);
};
