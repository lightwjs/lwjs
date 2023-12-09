import * as CSS from "csstype";
import { ReactiveValue } from "../reactive";
import { DomEventProps } from "./events";

export type CSSProperties = CSS.Properties<string | number>;

export type CSSPropertiesFallback = CSS.PropertiesFallback<number | string>;

export type CSSPseudos = { [K in CSS.Pseudos]?: CSSObject };

export type CSSObjectBase = {
  [K in keyof CSSPropertiesFallback]: CSSPropertiesFallback[K];
};

export interface CSSOthersObject {
  [propertiesName: string]: CSSObject;
}

export interface CSSObject extends CSSObjectBase, CSSPseudos, CSSOthersObject {}

export type LwDomProps<T extends HTMLElement | SVGElement> = {
  css?: CSSObject | ReactiveValue<CSSObject>;
} & DomEventProps<T>;

export type Booleanish = boolean | "true" | "false";

export type CrossOrigin = "anonymous" | "use-credentials" | "" | undefined;

export type LwReactiveProps<T> = {
  [key in keyof T]: T[key] | ReactiveValue<T[key]>;
};
