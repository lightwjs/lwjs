import { TextElement } from "../elements";

export const createTextElementDom = (el: TextElement) => {
  el.nodes = [document.createTextNode(String(el.text))];
};
