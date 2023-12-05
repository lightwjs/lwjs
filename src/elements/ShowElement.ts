import { LW_EL_SYMBOL, TYPE_MAP } from "../constants";
import { ReactiveValue } from "../reactive";
import { BaseLwElement, LwElement, LwNode } from "../types";
import { HtmlElement } from "./HtmlElement";
import { createElements } from "./createElements";

export class ShowElement implements BaseLwElement {
  constructor(
    public reactive: ReactiveValue,
    yesNode: LwNode,
    noNode?: LwNode
  ) {
    this.yesElements = createElements(yesNode);
    this.noElements = createElements(noNode);
  }
  brand = LW_EL_SYMBOL;
  type = TYPE_MAP.show;
  yesElements;
  noElements;
  htmlParent?: HtmlElement;
  nextEl?: LwElement;
  nodes?: any[];
  parent?: LwElement;
  children: LwElement[] = [];
}

export const show = (when: ReactiveValue, then: LwNode, otherwise?: LwNode) =>
  new ShowElement(when, then, otherwise);
