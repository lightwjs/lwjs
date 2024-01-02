import { activeComponent } from "../activeComponent";
import { ProviderElement, ProviderProps } from "../elements";
import { LwElement, LwNode } from "../types";
import { isLwObjectOfType } from "../utils";

export class Context<T> {
  provider(props: ProviderProps<T>, ...nodes: LwNode[]): ProviderElement<T> {
    return new ProviderElement(props.value, this, nodes);
  }
}

export const createContext = <T>() => {
  return new Context<T>();
};

export const getContext = <Value>(context: Context<Value>) => {
  let current: LwElement | undefined = activeComponent.get();

  while (current) {
    if (isLwObjectOfType(current, "provider") && current.ctx === context) {
      return current.value as Value;
    }
    current = current.parent;

    if (!current) return undefined as Value;
  }

  return undefined as Value;
};
