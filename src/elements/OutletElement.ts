import { LW_EL_SYMBOL, TYPE_MAP } from "../constants";
import { Effect } from "../reactive";
import { BaseLwElement, LwElement } from "../types";
import { HtmlElement } from "./HtmlElement";

export class OutletElement implements BaseLwElement {
  brand = LW_EL_SYMBOL;
  type = TYPE_MAP.outlet;
  nextEl?: LwElement;
  nodes?: any[];
  parent?: LwElement;
  htmlParent?: HtmlElement;
  effects?: Effect[];
}

export const outlet = () => new OutletElement();
