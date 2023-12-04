import * as CSS from "csstype";
import { Signal } from "../../core";
import { DomEventProps } from "./events";

export type CSSProperties = CSS.Properties<string | number>;

export type CSSObject = {
  [k in keyof CSSProperties]: CSSProperties[k];
};

export type LwDomProps<T extends HTMLElement | SVGElement> = {
  css?: CSSObject | (() => CSSObject);
} & DomEventProps<T>;

export type Booleanish = boolean | "true" | "false";

export type CrossOrigin = "anonymous" | "use-credentials" | "" | undefined;

export type UseFn<T extends HTMLElement | SVGElement> = (
  node: T
) => (() => void) | void;

export type LwReactiveProps<T> = {
  [key in keyof T]: T[key] | Signal<T[key]>;
};
