import { LW_EL_SYMBOL, TYPE_MAP } from "../constants";
import { Effect } from "../reactive";
import { BaseLwElement, LwElement } from "../types";

export class HtmlElement implements BaseLwElement {
  constructor(
    public tag: string,
    public props: Record<string, any>,
    public children: LwElement[],
    public isSvg: boolean
  ) {}
  brand = LW_EL_SYMBOL;
  type = TYPE_MAP.html;
  nodes?: any[];
  htmlParent?: HtmlElement;
  nextEl?: LwElement;
  parent?: LwElement;
  effects?: Effect[];
}
