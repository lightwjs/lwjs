import { LW_EL_SYMBOL, TYPE_MAP } from "../constants";
import { Effect } from "../reactive";
import { BaseLwElement, LwElement, LwNode } from "../types";
import { handlePropsArg } from "../utils";
import { ComponentApi } from "./ComponentApi";
import { HtmlElement } from "./HtmlElement";
import { createElements } from "./createElements";

export class ComponentElement<Props> implements BaseLwElement {
  constructor(
    public render: ComponentRenderFn<Props>,
    public props: ComponentProps<Props>
  ) {}
  brand = LW_EL_SYMBOL;
  type = TYPE_MAP.component;
  htmlParent?: HtmlElement;
  nextEl?: LwElement;
  nodes?: any[];
  parent?: LwElement;
  children: LwElement[] = [];
  effects: Effect[] = [];
}

type ComponentFactoryFn<P> = {
  (props: P, ...nodes: LwNode[]): ComponentElement<P>;
  (...nodes: LwNode[]): ComponentElement<P>;
};

export const component =
  <P = void>(render: ComponentRenderFn<P>): ComponentFactoryFn<P> =>
  (propsOrNode: any, ...nodes: LwNode[]) => {
    const { props, nodesToPass } = handlePropsArg(propsOrNode, nodes);

    const propsToPass = {
      ...(props as P),
      children: createElements(nodesToPass),
    };

    return new ComponentElement(render, propsToPass);
  };

type ComponentProps<P> = P & { children: LwElement[] };

type ComponentRenderFn<Props = void> = (api: ComponentApi<Props>) => LwNode;
