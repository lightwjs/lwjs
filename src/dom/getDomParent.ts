import { LwElement } from "../types";

export const getDomParent = (el: LwElement) => {
  return el.htmlParent?.nodes?.[0];
};
