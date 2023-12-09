import * as CSS from "csstype";
import { ReactiveValue } from "../reactive";
import { CSSObject } from "./css";
import { DomEventProps } from "./events";

export type CSSProperties = CSS.Properties<string | number>;

export type LwDomProps<T extends HTMLElement | SVGElement> = {
  css?: CSSObject | ReactiveValue<CSSObject>;
} & DomEventProps<T>;

export type Booleanish = boolean | "true" | "false";

export type CrossOrigin = "anonymous" | "use-credentials" | "" | undefined;

export type LwReactiveProps<T> = {
  [key in keyof T]: T[key] | ReactiveValue<T[key]>;
};
