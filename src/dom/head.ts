import { HeadElement } from "../elements";
import { syncEffect } from "../reactive";
import { isReactiveValue } from "../utils";

export const createHeadElementDom = (el: HeadElement) => {
  if (el.tag === "title") {
    if (isReactiveValue(el.props.text)) {
      const eff = syncEffect(() => {
        document.title = el.props.text.value;
      });
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
        const eff = syncEffect(() => {
          meta.setAttribute(key, value.value);
        });
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
