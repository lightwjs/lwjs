import { ComponentApi, ComponentElement, createElements } from "../elements";
import { DomRenderer } from "./DomRenderer";

export const createComponentElementDom = (
  el: ComponentElement<any>,
  renderer: DomRenderer
) => {
  const api = new ComponentApi(el, renderer.reactiveContext);
  el.children = createElements(el.render(api));
  el.nodes = renderer.create(el.children, el);
};
