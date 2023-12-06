import { DomRenderer } from "./DomRenderer";

export const render = (node: any, container: HTMLElement) => {
  new DomRenderer().render(node, container);
};
