import { EmptyNode, TextNode } from "../types";

export const isTextNode = (v: any): v is TextNode => {
  return typeof v === "string" || typeof v === "number";
};

export const isEmptyNode = (v: any): v is EmptyNode => {
  return v == null || typeof v === "boolean";
};

export const uppercaseLetterRegX = /[A-Z]/;

export const isEventProp = (propKey: string) =>
  propKey !== "on" &&
  propKey.indexOf("on") === 0 &&
  uppercaseLetterRegX.test(propKey[2]);

export const getEventTypeFromPropKey = (propKey: string) =>
  propKey.slice(2).toLowerCase();

export const isFunction = (v: any): v is Function => typeof v === "function";

export * from "./handlePropsArg";
export * from "./isLwElement";
export * from "./isLwObjectOfType";
export * from "./isObject";
export * from "./isParentElement";
export * from "./isReactiveValue";
