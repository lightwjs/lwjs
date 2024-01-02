import { ReactiveElement } from "../elements";
import { Effect } from "../reactive";

export const createReactiveElementDom = (el: ReactiveElement) => {
  const txt = document.createTextNode(el.reactive.value);
  el.nodes = [txt];

  const eff = new Effect([el.reactive], () => {
    txt.textContent = el.reactive.value;
  });

  el.effects = [eff];
  return el.nodes;
};
