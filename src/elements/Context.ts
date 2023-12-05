import { ProviderElement, ProviderProps } from "../elements";
import { LwNode } from "../types";

export class Context<T> {
  provider(props: ProviderProps<T>, ...nodes: LwNode[]): ProviderElement<T> {
    return new ProviderElement(props.value, this, nodes);
  }
}

export const createContext = <T>() => {
  return new Context<T>();
};
