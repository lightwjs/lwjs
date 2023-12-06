import { Effect } from "../reactive";
import { LwElement } from "../types";

export type DomNode = HTMLElement | SVGElement | Text;

export type CreateDomSingleElementFn<T extends LwElement> = (el: T) => {
  nodes: DomNode[];
  effects: Effect[];
};
