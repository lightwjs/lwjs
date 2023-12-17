import { HeadElement } from "../elements";
import { Effect } from "../reactive";
import { isReactiveValue } from "../utils";
import { DomRenderer } from "./DomRenderer";

export const createHeadElementDom = (
  el: HeadElement,
  renderer: DomRenderer
) => {
  if (el.tag === "title") {
    if (isReactiveValue(el.props.text)) {
      const eff = new Effect(() => {
        document.title = el.props.text.value;
      }, renderer.ctx);
      el.effects = [eff];
    }
    //
    else {
      document.title = el.props.text;
    }
  }
  //
  else if (el.tag === "meta") {
    const head = document.head;

    const meta = document.createElement("meta");

    const keys = Object.keys(el.props);

    for (const key of keys) {
      const value = el.props[key];
      if (isReactiveValue(value)) {
        const eff = new Effect(() => {
          meta.setAttribute(key, value.value);
        }, renderer.ctx);
        el.effects = [eff];
      }
      //
      else {
        meta.setAttribute(key, value);
      }
    }

    head.appendChild(meta);
  }
  return [];
};
