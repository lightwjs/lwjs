import { LW_EL_SYMBOL, TYPE_MAP } from "../constants";
import { Effect, ReactiveValue } from "../reactive";
import { BaseLwElement, LwElement, LwReactiveProps } from "../types";
import { HtmlElement } from "./HtmlElement";

export class HeadElement implements BaseLwElement {
  constructor(public tag: string, public props: Record<string, any>) {}
  brand = LW_EL_SYMBOL;
  type = TYPE_MAP.head;
  htmlParent?: HtmlElement;
  nextEl?: LwElement;
  nodes?: any[];
  parent?: LwElement;
  effects?: Effect[];
}

type MetaProps = LwReactiveProps<{
  name?: string;
  content?: string;
  charSet?: string;
  httpEquiv?: string;
}>;

export const head = {
  title: (text: string | ReactiveValue<string>) => {
    return new HeadElement("title", { text });
  },
  meta: (props: MetaProps) => {
    return new HeadElement("meta", props);
  },
};
