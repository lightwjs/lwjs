import { HtmlElement } from "../../elements";
import { syncEffect } from "../../reactive";
import {
  getEventTypeFromPropKey,
  isEventProp,
  isReactiveValue,
} from "../../utils";
import { createDomNodes } from "../createDomNodes";
import { setAttributeOrProp } from "./setAttributeOrProp";

export const createHtmlElement = (el: HtmlElement) => {
  const dom = el.isSvg
    ? document.createElementNS("http://www.w3.org/2000/svg", el.tag)
    : document.createElement(el.tag);
  el.nodes = [dom];

  dom.append(...createDomNodes(el.children, el));

  const keys = Object.keys(el.props);

  for (const key of keys) {
    const value = el.props[key];

    if (isEventProp(key)) {
      dom.addEventListener(getEventTypeFromPropKey(key), value);
    }
    //
    else {
      if (isReactiveValue(value)) {
        syncEffect(() => {
          setAttributeOrProp(el, key, value.value);
        });
      }
      //
      else {
        setAttributeOrProp(el, key, value);
      }
    }
  }

  return dom;
};
