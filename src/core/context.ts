import { LW_EL_SYMBOL } from "./constants";
import { createElements } from "./createElements";
import { currentCmp } from "./currentComponent";
import { LwElement, LwNode, ProviderElement } from "./types";

type ProviderProps<T> = {
  value: T;
};

export class Context<T> {
  provider(props: ProviderProps<T>, ...nodes: LwNode[]): ProviderElement<T> {
    return {
      brand: LW_EL_SYMBOL,
      type: "provider",
      ctx: this,
      value: props.value,
      children: createElements(nodes),
    };
  }
}

export const createContext = <T>() => {
  return new Context<T>();
};

export const getContext = <T>(context: Context<T>) => {
  let current: LwElement | undefined = currentCmp.get();

  if (!current) {
    throw new Error("getContext must be called in a component");
  }

  while (current) {
    if (current.type === "provider" && current.ctx === context) {
      return current.value as T;
    }
    current = current.parent;

    if (!current) return undefined as T;
  }

  return undefined as T;
};
