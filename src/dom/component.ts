import { activeComponent } from "../activeComponent";
import { ComponentElement, createElements } from "../elements";
import { DomRenderer } from "./DomRenderer";

export const createComponentElementDom = (
  el: ComponentElement<any>,
  renderer: DomRenderer
) => {
  activeComponent.set(el);
  el.children = createElements(el.render(el.props));
  activeComponent.set(undefined);
  return renderer.create(el.children, el);
};
