import { isObject } from "./isObject";

export const isPlainObject = (v: any): v is Record<string, any> => {
  return isObject(v) && v.constructor === Object;
};
