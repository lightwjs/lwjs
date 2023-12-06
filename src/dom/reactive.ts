import { ReactiveElement } from "../elements";
import { syncEffect } from "../reactive";

export const createReactiveElementDom = (el: ReactiveElement) => {
  const node = document.createTextNode(el.reactive.value);

  const eff = syncEffect(() => {
    node.textContent = el.reactive.value;
  });

  el.nodes = [node];
  el.effects = [eff];
};
