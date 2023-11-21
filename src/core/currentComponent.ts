import { ComponentElement } from "./types";

export const currentCmp = (() => {
  let cmp: ComponentElement<any> | undefined;

  return {
    get() {
      return cmp;
    },
    set(newCmp: ComponentElement<any> | undefined) {
      cmp = newCmp;
    },
  };
})();
