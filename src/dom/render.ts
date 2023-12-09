import { LwNode } from "../types";
import { DomRenderer } from "./DomRenderer";

export const render = (node: LwNode, container: HTMLElement) => {
  new DomRenderer().render(node, container);
};
