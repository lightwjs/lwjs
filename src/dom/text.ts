import { TextElement } from "../elements";

export const createTextElementDom = (el: TextElement) => {
  const txt = document.createTextNode(String(el.text));
  el.nodes = [txt];
  return el.nodes;
};
