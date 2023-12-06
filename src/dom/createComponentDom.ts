import { ComponentApi, ComponentElement, createElements } from "../elements";
import { createDomNodes } from "./createDomNodes";

export const createComponentElement = <Props>(el: ComponentElement<Props>) => {
  const api = new ComponentApi(el);
  el.children = createElements(el.render(api));
  el.nodes = createDomNodes(el.children, el);
};
