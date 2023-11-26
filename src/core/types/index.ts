import { Signal } from "../reactive";
import { LwElement } from "./elements";

export type TextNode = string | number;

export type EmptyNode = boolean | null | undefined;

export type LwNode =
  | TextNode
  | EmptyNode
  | Signal<any>
  | LwElement
  | LwNode[];

export * from "./aria";
export * from "./elements";
export * from "./events";
export * from "./html";
export * from "./shared";
export * from "./svg";
