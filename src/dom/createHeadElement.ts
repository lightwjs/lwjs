import { HeadElement } from "../elements";
import { syncEffect } from "../reactive";
import { isReactiveValue } from "../utils";

export const createHeadElement = (el: HeadElement) => {
  if (el.tag === "title") {
    if (isReactiveValue(el.props.text)) {
      syncEffect(() => {
        document.title = el.props.text.value;
      });
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
        syncEffect(() => {
          meta.setAttribute(key, value.value);
        });
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
