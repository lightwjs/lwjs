import { ComponentElement } from "./elements";

export const activeComponent = (() => {
  let activeComponent: ComponentElement<any> | undefined;

  return {
    get() {
      return activeComponent;
    },
    set(active: ComponentElement<any> | undefined) {
      activeComponent = active;
    },
  };
})();
