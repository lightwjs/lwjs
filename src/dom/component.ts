import { activeComponent } from "../activeComponent";
import { ComponentElement, createElements } from "../elements";
import { createDomNodes } from "./createDomNodes";

export const createComponentElementDom = (el: ComponentElement<any>) => {
  activeComponent.set(el);
  el.children = createElements(el.render(el.props));
  activeComponent.set(undefined);
  return createDomNodes(el.children, el);
};
