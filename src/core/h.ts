import { SVG_MAP } from "./constants";
import { createElements, createHtmlElement } from "./createElements";
import {
  HTMLElementPropMap,
  HtmlElement,
  MintNode,
  SVGElementPropMap,
} from "./types";
import { isPropsObject } from "./utils";

export type HFn = {
  <Tag extends AllKeys>(
    tag: Tag,
    props: AllMap[Tag],
    ...nodes: MintNode[]
  ): HtmlElement;
  <Tag extends AllKeys>(tag: Tag, ...nodes: MintNode[]): HtmlElement;
};

export const h: HFn = <Tag extends AllKeys>(
  tag: Tag,
  propsOrNode: any,
  ...nodes: MintNode[]
) => {
  let props = {};
  let nodesToPass: MintNode[] = [];

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
    !!SVG_MAP[tag as keyof SVGElementPropMap]
  );
};

type AllKeys = keyof HTMLElementPropMap | keyof SVGElementPropMap;

type AllMap = HTMLElementPropMap & SVGElementPropMap;
