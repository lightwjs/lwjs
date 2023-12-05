import { LW_EL_SYMBOL, TYPE_MAP } from "../constants";
import { ReactiveValue } from "../reactive";
import { BaseLwElement, LwElement } from "../types";
import { HtmlElement } from "./HtmlElement";

export class ReactiveElement implements BaseLwElement {
  constructor(public reactive: ReactiveValue) {}
  brand = LW_EL_SYMBOL;
  type = TYPE_MAP.reactive;
  htmlParent?: HtmlElement;
  nextEl?: LwElement;
  nodes?: any[];
  parent?: LwElement;
}
