import { LW_EL_SYMBOL } from "../constants";
import { LwElement } from "../types";
import { isObject } from "./isObject";

export const isLwElement = (v: any): v is LwElement => {
  return isObject(v) && v.brand === LW_EL_SYMBOL;
};
