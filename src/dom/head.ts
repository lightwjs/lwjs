import { HeadElement } from "../elements";
import { Effect } from "../reactive";
import { isReactiveValue } from "../utils";

export const createHeadElementDom = (el: HeadElement) => {
  if (el.tag === "title") {
    if (isReactiveValue(el.props.text)) {
      const eff = new Effect([el.props.text], () => {
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
        const eff = new Effect([value], () => {
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
