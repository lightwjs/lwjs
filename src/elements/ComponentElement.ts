import { LW_EL_SYMBOL, TYPE_MAP } from "../constants";
import { BaseLwElement, LwElement, LwNode } from "../types";
import { isPropsObject } from "../utils";
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
}

type ComponentFactoryFn<P> = {
  (props: P, ...nodes: LwNode[]): ComponentElement<P>;
  (...nodes: LwNode[]): ComponentElement<P>;
};

export const component =
  <P = void>(render: ComponentRenderFn<P>): ComponentFactoryFn<P> =>
  (propsOrNode: any, ...nodes: LwNode[]) => {
    let props = {} as P;
    let nodesToPass: LwNode[] = [];

    if (isPropsObject(propsOrNode)) {
      props = propsOrNode as P;
    }
    //
    else {
      nodesToPass = [propsOrNode];
    }

    nodesToPass = [...nodesToPass, ...nodes];

    const propsToPass = {
      ...props,
      children: createElements(nodesToPass),
    };

    return new ComponentElement(render, propsToPass);
  };

type ComponentProps<P> = P & { children: LwElement[] };

type ComponentRenderFn<Props = void> = (api: ComponentApi<Props>) => LwNode;
