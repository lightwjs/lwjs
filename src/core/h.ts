import { createElements, createHtmlElement } from "./createElements";
import { HTMLElementPropMap } from "./types";

export const h = <Tag extends keyof HTMLElementPropMap>(
  tag: Tag,
  props: HTMLElementPropMap[Tag]
) => {
  const { node, ...rest } = props;
  return createHtmlElement(tag, rest, createElements(node));
};
