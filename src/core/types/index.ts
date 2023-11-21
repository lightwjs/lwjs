import { Signal } from "../reactive";
import { MintElement } from "./elements";

export type TextNode = string | number;

export type EmptyNode = boolean | null | undefined;

export type MintNode =
  | TextNode
  | EmptyNode
  | Signal<any>
  | MintElement
  | MintNode[];

export * from "./aria";
export * from "./elements";
export * from "./events";
export * from "./html";
export * from "./shared";
export * from "./svg";
