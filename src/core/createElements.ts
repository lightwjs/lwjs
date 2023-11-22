import { MINT_EL_SYMBOL, TYPE_MAP } from "./constants";
import { Signal } from "./reactive";
import {
  ComponentElement,
  HtmlElement,
  ListElement,
  ListElementRenderItemFn,
  MintElement,
  MintNode,
  ReactiveElement,
  ShowElement,
  TextElement,
  TextNode,
} from "./types";
import { isEmptyNode, isMintElement, isSignal, isTextNode } from "./utils";

export const createElements = (...nodes: MintNode[]) => {
  const els: MintElement[] = [];

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
    else if (isMintElement(node)) {
      els.push(node);
    }
  }

  return els;
};

export const createTextElement = (text: TextNode): TextElement => {
  return {
    brand: MINT_EL_SYMBOL,
    type: TYPE_MAP.txt,
    text: String(text),
  };
};

export const createReactiveElement = (reactive: Signal): ReactiveElement => {
  return {
    brand: MINT_EL_SYMBOL,
    type: TYPE_MAP.rct,
    rct: reactive,
  };
};

export const createHtmlElement = (
  tag: string,
  props: Record<string, any>,
  children: MintElement[]
): HtmlElement => {
  return {
    brand: MINT_EL_SYMBOL,
    type: TYPE_MAP.html,
    tag,
    props,
    children,
  };
};

export const show = (
  when: Signal,
  then: MintNode,
  otherwise?: MintNode
): ShowElement => {
  return {
    brand: MINT_EL_SYMBOL,
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
    brand: MINT_EL_SYMBOL,
    type: TYPE_MAP.list,
    rct: arr,
    renderItem,
    children: [],
    prevArr: [],
    cache: new Map(),
  };
};

export const createComponentElement = <P>(
  render: (props: P) => MintNode,
  props: P
): ComponentElement<P> => {
  return {
    brand: MINT_EL_SYMBOL,
    type: TYPE_MAP.cmp,
    props,
    children: [],
    render,
    effects: [],
  };
};

export const cmp =
  <P = void>(render: (props: P) => MintNode) =>
  (props: P) =>
    createComponentElement(render, props);
