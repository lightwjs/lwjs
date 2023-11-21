import { MINT_EL_SYMBOL } from "./constants";
import { createElements } from "./createElements";
import { currentCmp } from "./currentComponent";
import { MintElement, MintNode, ProviderElement } from "./types";

export class Context<T> {
  provider(props: { value: T; node?: MintNode }): ProviderElement<T> {
    return {
      brand: MINT_EL_SYMBOL,
      type: "provider",
      ctx: this,
      value: props.value,
      children: createElements(props.node),
    };
  }
}

export const createContext = <T>() => {
  return new Context<T>();
};

export const getContext = <T>(context: Context<T>) => {
  let current: MintElement | undefined = currentCmp.get();

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
