import { HtmlElement } from "../elements";
import { CSSProperties } from "../types";
import { isEventProp, isReactiveValue } from "../utils";
import { SsrRenderer } from "./SsrRenderer";

export const htmlElToString = (el: HtmlElement, renderer: SsrRenderer) => {
  let s = `<${el.tag}`;

  const props: string[] = [];
  const keys = Object.keys(el.props);

  for (const key of keys) {
    const value = el.props[key];
    if (isEventProp(key)) continue;

    const keyAlias = ATTRIBUTE_ALIASES[key];

    let v = value;

    if (isReactiveValue(v)) {
      v = v.value;
    }

    if (key === "style") {
      v = styleObjectToString(v);
    }

    props.push(`${keyAlias ?? key}="${v}"`);
  }

  if (props.length > 0) {
    s += ` ${props.join(" ")}`;
  }

  if (el.children.length > 0) {
    const childrenString = renderer.create(el.children);
    s += `>${childrenString}</${el.tag}>`;
  }
  //
  else {
    s += "/>";
  }

  return s;
};

export const styleObjectToString = (obj: CSSProperties) => {
  const keys = Object.keys(obj) as (keyof CSSProperties)[];
  let s = "";

  for (const key of keys) {
    let v = obj[key];

    const k = key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);

    if (typeof v === "number") {
      v = `${v}px`;
    }

    s += `${k}:${v};`;
  }
  return s;
};

const ATTRIBUTE_ALIASES: Record<string, string> = {
  className: "class",
  htmlFor: "for",
};
