import * as CSS from "csstype";
import { MintNode, Signal } from "../../core";
import { MintEventProps } from "./events";

export type CSSProperties = CSS.Properties<string | number>;

export type MintDomProps<T extends HTMLElement | SVGElement> = {
  node?: MintNode;
  use?: UseFn<T> | UseFn<T>[];
} & MintEventProps<T>;

export type Booleanish = boolean | "true" | "false";

export type CrossOrigin = "anonymous" | "use-credentials" | "" | undefined;

export type UseFn<T extends HTMLElement | SVGElement> = (
  node: T
) => (() => void) | void;

export type MintReactiveProps<T> = {
  [key in keyof T]: T[key] | Signal<T[key]>;
};
