import { HtmlElement } from "../elements";
import { Effect } from "../reactive";
import {
  getEventTypeFromPropKey,
  isEventProp,
  isReactiveValue,
} from "../utils";
import { DomRenderer } from "./DomRenderer";

export const createHtmlElementDom = (
  el: HtmlElement,
  renderer: DomRenderer
) => {
  const dom = el.isSvg
    ? document.createElementNS("http://www.w3.org/2000/svg", el.tag)
    : document.createElement(el.tag);
  el.nodes = [dom];

  dom.append(...renderer.create(el.children, el));

  const keys = Object.keys(el.props);

  for (const key of keys) {
    const value = el.props[key];

    if (isEventProp(key)) {
      dom.addEventListener(getEventTypeFromPropKey(key), value);
    }
    //
    else {
      if (isReactiveValue(value)) {
        const eff = new Effect(() => {
          setAttributeOrProp(el, dom, key, value.value, renderer);
        }, renderer.ctx);
        if (!el.effects) el.effects = [];
        el.effects.push(eff);
      }
      //
      else {
        setAttributeOrProp(el, dom, key, value, renderer);
      }
    }
  }

  return dom;
};

export const setAttributeOrProp = (
  el: HtmlElement,
  node: HTMLElement | SVGElement,
  key: string,
  value: any,
  renderer: DomRenderer
) => {
  if (key === "style") {
    setStyleAttribute(node, value);
  }
  //
  else if (key === "css") {
    setCssClass(el, node, value, renderer);
  }
  //
  else if (PROP_MAP[key]) {
    (node as any)[key] = value;
  }
  //
  else {
    node.setAttribute(ATTRIBUTE_ALIASES[key] ?? key, value as any);
  }
};

export const setStyleAttribute = (
  node: HTMLElement | SVGElement,
  styleObj: Record<string, any>
) => {
  for (const key of Object.keys(styleObj)) {
    let v = styleObj[key];

    if (typeof v === "number") {
      v = `${v}px`;
    }
    node.style[key as any] = v;
  }
};

export const setCssClass = (
  el: HtmlElement,
  node: HTMLElement | SVGElement,
  value: any,
  renderer: DomRenderer
) => {
  const className = renderer.cssRenderer.getCssClass(value);

  if (el.cls) {
    if (el.cls !== className) {
      node.classList.remove(el.cls);
    }
    //
    else return;
  }

  el.cls = className;
  node.classList.add(className);
};

// html props treated as element properties ( not attributes )
const PROP_MAP: any = {
  checked: 1,
  selected: 1,
  type: 1,
  value: 1,
};

const ATTRIBUTE_ALIASES: Record<string, string> = {
  className: "class",
  htmlFor: "for",
};
