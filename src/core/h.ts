import { SVG_MAP } from "./constants";
import { createElements, createHtmlElement } from "./createElements";
import {
  HTMLElementPropMap,
  HtmlElement,
  LwNode,
  SVGElementPropMap,
} from "./types";
import { isPropsObject } from "./utils";

export type HFn = {
  <Tag extends AllKeys>(
    tag: Tag,
    props: AllMap[Tag],
    ...nodes: LwNode[]
  ): HtmlElement;
  <Tag extends AllKeys>(tag: Tag, ...nodes: LwNode[]): HtmlElement;
};

export const h: HFn = <Tag extends AllKeys>(
  tag: Tag,
  propsOrNode: any,
  ...nodes: LwNode[]
) => {
  let props = {};
  let nodesToPass: LwNode[] = [];

  if (isPropsObject(propsOrNode)) {
    props = propsOrNode;
  }
  //
  else {
    nodesToPass = [propsOrNode];
  }

  nodesToPass = [...nodesToPass, ...nodes];

  return createHtmlElement(
    tag,
    props,
    createElements(nodesToPass),
    tag in SVG_MAP
  );
};

type AllKeys = keyof HTMLElementPropMap | keyof SVGElementPropMap;

type AllMap = HTMLElementPropMap & SVGElementPropMap;
