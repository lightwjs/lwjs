import { isLwElement } from ".";
import { LwElement } from "../types";

export const isParentElement = (
  v: any
): v is LwElement & { children: LwElement[] } => {
  return isLwElement(v) && "children" in v;
};
