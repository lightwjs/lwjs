import { ReactiveElement } from "../elements";
import { Effect } from "../reactive";
import { DomRenderer } from "./DomRenderer";

export const createReactiveElementDom = (
  el: ReactiveElement,
  renderer: DomRenderer
) => {
  const txt = document.createTextNode(el.reactive.value);
  el.node = txt;

  const eff = new Effect(() => {
    txt.textContent = el.reactive.value;
  }, renderer.ctx);

  el.effects = [eff];
  return [txt];
};
