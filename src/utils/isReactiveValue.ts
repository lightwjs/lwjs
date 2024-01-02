import { ReactiveValue } from "../reactive";
import { isLwObjectOfType } from "./isLwObjectOfType";

export const isReactiveValue = (v: any): v is ReactiveValue => {
  return isLwObjectOfType(v, "state") || isLwObjectOfType(v, "computed");
};
