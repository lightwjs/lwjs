import { LW_EL_SYMBOL, TYPE_MAP } from "../constants";
import { ReactiveValue } from "../reactive";
import { EmptyNode, LwElement, TextNode } from "../types";

export const isTextNode = (v: any): v is TextNode => {
  return typeof v === "string" || typeof v === "number";
};

export const isEmptyNode = (v: any): v is EmptyNode => {
  return v == null || typeof v === "boolean";
};

export const isObject = (v: any): v is Record<string, any> => {
  return v != null && typeof v === "object";
};

export const isReactiveValue = (v: any): v is ReactiveValue => {
  return (
    isObject(v) && (v.type === TYPE_MAP.signal || v.type === TYPE_MAP.computed)
  );
};

export const isLwElement = (v: any): v is LwElement => {
  return isObject(v) && v.brand === LW_EL_SYMBOL;
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
export * from "./isParentElement";
