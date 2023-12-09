import { ReactiveElement } from "../elements";
import { Effect } from "../reactive";
import { DomRenderer } from "./DomRenderer";

export const createReactiveElementDom = (
  el: ReactiveElement,
  renderer: DomRenderer
) => {
  const node = document.createTextNode(el.reactive.value);

  const eff = new Effect(() => {
    node.textContent = el.reactive.value;
  }, renderer.reactiveContext);

  el.nodes = [node];
  el.effects = [eff];
};
