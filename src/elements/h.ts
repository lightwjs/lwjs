import { SVG_MAP } from "../constants";
import { HTMLElementPropMap, LwNode, SVGElementPropMap } from "../types";
import { handlePropsArg } from "../utils";
import { HtmlElement } from "./HtmlElement";
import { createElements } from "./createElements";

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
  const { props, nodesToPass } = handlePropsArg(propsOrNode, nodes);

  return new HtmlElement(
    tag,
    props,
    createElements(nodesToPass),
    tag in SVG_MAP
  );
};

type AllKeys = keyof HTMLElementPropMap | keyof SVGElementPropMap;

type AllMap = HTMLElementPropMap & SVGElementPropMap;
