import { LW_EL_SYMBOL, TYPE_MAP } from "../constants";
import { Effect } from "../reactive";
import { BaseLwElement, LwElement, TextNode } from "../types";
import { HtmlElement } from "./HtmlElement";

export class TextElement implements BaseLwElement {
  constructor(public text: TextNode) {}
  brand = LW_EL_SYMBOL;
  type = TYPE_MAP.txt;
  htmlParent?: HtmlElement;
  nextEl?: LwElement;
  nodes?: any[];
  parent?: LwElement;
  effects?: Effect[];
}
