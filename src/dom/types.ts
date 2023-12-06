import { LwElement } from "../types";

export type DomNode = HTMLElement | SVGElement | Text;

export type ElementDomRenderer = {
  create(el: LwElement): void;
};
