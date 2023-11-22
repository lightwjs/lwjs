import { SVG_MAP } from "./constants";
import { createElements, createHtmlElement } from "./createElements";
import { HTMLElementPropMap, SVGElementPropMap } from "./types";

export const h = <Tag extends AllKeys>(tag: Tag, props: AllMap[Tag]) => {
  const { node, ...rest } = props;
  return createHtmlElement(
    tag,
    rest,
    createElements(node),
    !!SVG_MAP[tag as keyof SVGElementPropMap]
  );
};

type AllKeys = keyof HTMLElementPropMap | keyof SVGElementPropMap;

type AllMap = HTMLElementPropMap & SVGElementPropMap;
