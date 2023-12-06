import { LW_EL_SYMBOL, TYPE_MAP } from "../constants";
import { Effect } from "../reactive";
import { BaseLwElement, LwElement, LwNode } from "../types";
import { Context } from "./Context";
import { HtmlElement } from "./HtmlElement";
import { createElements } from "./createElements";

export class ProviderElement<Value> implements BaseLwElement {
  constructor(
    public value: Value,
    public ctx: Context<Value>,
    ...nodes: LwNode[]
  ) {
    this.children = createElements(nodes);
  }
  brand = LW_EL_SYMBOL;
  type = TYPE_MAP.provider;
  children;
  htmlParent?: HtmlElement;
  nextEl?: LwElement;
  nodes?: any[];
  parent?: LwElement;
  effects?: Effect[];
}

export type ProviderProps<Value> = {
  value: Value;
};
