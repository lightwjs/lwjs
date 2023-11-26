import { LW_EL_SYMBOL } from "./constants";
import { Signal } from "./reactive";
import { EmptyNode, LwElement, TextNode } from "./types";

export const isTextNode = (v: any): v is TextNode => {
  return typeof v === "string" || typeof v === "number";
};

export const isEmptyNode = (v: any): v is EmptyNode => {
  return v == null || typeof v === "boolean";
};

export const isObject = (v: any): v is Record<string, any> => {
  return v != null && typeof v === "object";
};

export const isPlainObject = (v: any): v is Record<string, any> => {
  return isObject(v) && v.constructor === Object;
};

export const isSignal = (v: any): v is Signal => {
  return isObject(v) && v.brand === Symbol.for("preact-signals");
};

export const isLwElement = (v: any): v is LwElement => {
  return isPlainObject(v) && v.brand === LW_EL_SYMBOL;
};

export const isPropsObject = (v: any): v is Record<string, any> => {
  return isPlainObject(v) && v.brand !== LW_EL_SYMBOL;
};

export const uppercaseLetterRegX = /[A-Z]/;

export const isEventProp = (propKey: string) =>
  propKey !== "on" &&
  propKey.indexOf("on") === 0 &&
  uppercaseLetterRegX.test(propKey[2]);

export const getEventTypeFromPropKey = (propKey: string) =>
  propKey.slice(2).toLowerCase();
