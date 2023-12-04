import { LW_EL_SYMBOL, TYPE_MAP } from "./constants";
import { Signal } from "./reactive";
import {
  ComponentElement,
  ComponentProps,
  ComponentRenderFn,
  HeadElement,
  HtmlElement,
  ListElement,
  ListElementRenderItemFn,
  LwElement,
  LwNode,
  ReactiveElement,
  ShowElement,
  TextElement,
  TextNode,
} from "./types";
import {
  isEmptyNode,
  isLwElement,
  isPropsObject,
  isSignal,
  isTextNode,
} from "./utils";

export const createElements = (...nodes: LwNode[]) => {
  const els: LwElement[] = [];

  const flatNodes = nodes.flat(Infinity as 1);

  for (const node of flatNodes) {
    if (isEmptyNode(node)) {
      continue;
    }
    //
    else if (isTextNode(node)) {
      els.push(createTextElement(node));
    }
    //
    else if (isSignal(node)) {
      els.push(createReactiveElement(node));
    }
    //
    else if (isLwElement(node)) {
      els.push(node);
    }
  }

  return els;
};

export const createTextElement = (text: TextNode): TextElement => {
  return {
    brand: LW_EL_SYMBOL,
    type: TYPE_MAP.txt,
    text: String(text),
  };
};

export const createReactiveElement = (reactive: Signal): ReactiveElement => {
  return {
    brand: LW_EL_SYMBOL,
    type: TYPE_MAP.rct,
    rct: reactive,
  };
};

export const createHtmlElement = (
  tag: string,
  props: Record<string, any>,
  children: LwElement[],
  isSvg: boolean
): HtmlElement => {
  return {
    brand: LW_EL_SYMBOL,
    type: TYPE_MAP.html,
    tag,
    props,
    children,
    isSvg,
  };
};

export const show = (
  when: Signal,
  then: LwNode,
  otherwise?: LwNode
): ShowElement => {
  return {
    brand: LW_EL_SYMBOL,
    type: TYPE_MAP.show,
    rct: when,
    yes: createElements(then),
    no: createElements(otherwise),
    children: [],
  };
};

export const list = <Item>(
  arr: Signal<Item[]>,
  renderItem: ListElementRenderItemFn<Item>
): ListElement<Item> => {
  return {
    brand: LW_EL_SYMBOL,
    type: TYPE_MAP.list,
    rct: arr,
    renderItem,
    children: [],
    prevArr: [],
    cache: new Map(),
  };
};

export const createComponentElement = <P>(
  render: ComponentRenderFn<P>,
  props: ComponentProps<P>
): ComponentElement<P> => {
  return {
    brand: LW_EL_SYMBOL,
    type: TYPE_MAP.cmp,
    props,
    children: [],
    render,
    effects: [],
  };
};

type CmpFactoryFn<P> = {
  (props: P, ...nodes: LwNode[]): ComponentElement<P>;
  (...nodes: LwNode[]): ComponentElement<P>;
};

export const cmp =
  <P = void>(render: (props: ComponentProps<P>) => LwNode): CmpFactoryFn<P> =>
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

    return createComponentElement(render, propsToPass);
  };

export const createHeadElement = <Tag>(
  tag: string,
  props: Record<string, any>
): HeadElement => {
  return {
    brand: LW_EL_SYMBOL,
    type: TYPE_MAP.head,
    tag,
    props,
  };
};
