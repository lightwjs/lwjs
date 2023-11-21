import {
  MintNode,
  createComponentElement,
  createElements,
  createHtmlElement,
} from "../core";

export const jsx = (tag: any, props: any, ...children: MintNode[]) => {
  if (typeof tag === "string") {
    return createHtmlElement(tag, props ?? {}, createElements(children));
  }
  //
  else if (typeof tag === "function") {
    return createComponentElement(tag, { ...props, children });
  }
};
