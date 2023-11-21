import { MintNode, ReadonlySignal, Signal } from "../../core";
import { TYPE_MAP } from "../constants";
import { Context } from "../context";

type BaseMintElement = {
  brand: Symbol;
  nextEl?: MintElement;
  nodes?: any[];
  parent?: MintElement;
  htmlParent?: HtmlElement;
};

export type TextElement = BaseMintElement & {
  type: typeof TYPE_MAP.txt;
  text: string;
};

export type HtmlElement = BaseMintElement & {
  type: typeof TYPE_MAP.html;
  tag: string;
  props: Record<string, any>;
  children: MintElement[];
};

export type ReactiveElement = BaseMintElement & {
  type: typeof TYPE_MAP.rct;
  rct: Signal;
};

export type ShowElement = BaseMintElement & {
  type: typeof TYPE_MAP.show;
  rct: Signal;
  yes: MintElement[];
  no: MintElement[];
  children: MintElement[];
};

export type ListElement<Item> = BaseMintElement & {
  type: typeof TYPE_MAP.list;
  rct: Signal<Item[]>;
  renderItem: (item: Item, index: Signal) => MintNode;
  children: MintElement[];
  prevArr: Item[];
  cache: Map<Item, ListCacheItem>;
};

export type ListCacheItem = {
  els: MintElement[];
  nodes: any[];
  index: Signal<number>;
  compIndex: ReadonlySignal<number>;
};

export type ProviderElement<T> = BaseMintElement & {
  type: typeof TYPE_MAP.provider;
  ctx: Context<T>;
  value: T;
  children: MintElement[];
};

export type ComponentElement<P> = BaseMintElement & {
  type: typeof TYPE_MAP.cmp;
  props: P;
  render: (props: P) => MintNode;
  children: MintElement[];
  effects: CmpEffect[];
};

export type CmpEffect = {
  cleanup?: () => void;
  usrCleanup?: () => void;
};

export type MintElement =
  | TextElement
  | HtmlElement
  | ReactiveElement
  | ShowElement
  | ListElement<any>
  | ProviderElement<any>
  | ComponentElement<any>;
