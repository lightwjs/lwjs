import { ReactiveValue } from "../reactive";
import { LwElement } from "./elements";

export type TextNode = string | number;

export type EmptyNode = boolean | null | undefined;

export type LwNode =
  | TextNode
  | EmptyNode
  | ReactiveValue<any>
  | LwElement
  | LwNode[];
