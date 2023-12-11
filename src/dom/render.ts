import { LwNode } from "../types";
import { DomRenderer, DomRendererOptions } from "./DomRenderer";

export const render = (
  node: LwNode,
  container: HTMLElement,
  options?: DomRendererOptions
) => {
  new DomRenderer(options).render(node, container);
};
