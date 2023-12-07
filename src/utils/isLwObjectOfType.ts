import { TYPE_MAP, TypeMap } from "../constants";
import { isObject } from "./isObject";

export const isLwObjectOfType = <Type extends keyof typeof TYPE_MAP>(
  v: any,
  type: Type
): v is TypeMap[Type] => {
  return isObject(v) && v.type === TYPE_MAP[type];
};
