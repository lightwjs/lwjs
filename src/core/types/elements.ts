import { LwNode, ReadonlySignal, Signal } from "../../core";
import { TYPE_MAP } from "../constants";
import { Context } from "../context";

type BaseLwElement = {
  brand: Symbol;
  nextEl?: LwElement;
  nodes?: any[];
  parent?: LwElement;
  htmlParent?: HtmlElement;
};

export type TextElement = BaseLwElement & {
  type: typeof TYPE_MAP.txt;
  text: string;
};

export type HtmlElement = BaseLwElement & {
  type: typeof TYPE_MAP.html;
  tag: string;
  props: Record<string, any>;
  children: LwElement[];
  isSvg: boolean;
};

export type ReactiveElement = BaseLwElement & {
  type: typeof TYPE_MAP.rct;
  rct: Signal;
};

export type ShowElement = BaseLwElement & {
  type: typeof TYPE_MAP.show;
  rct: Signal;
  yes: LwElement[];
  no: LwElement[];
  children: LwElement[];
};

export type ListElement<Item> = BaseLwElement & {
  type: typeof TYPE_MAP.list;
  rct: Signal<Item[]>;
  renderItem: ListElementRenderItemFn<Item>;
  children: LwElement[];
  prevArr: Item[];
  cache: ListElementCache<Item>;
};

export type ListElementRenderItemFn<Item> = (
  item: Item,
  index: ReadonlySignal
) => LwNode;

export type ListElementCache<Item> = Map<Item, ListCacheItem>;

export type ListCacheItem = {
  els: LwElement[];
  nodes: any[];
  index: Signal<number>;
  compIndex: ReadonlySignal<number>;
};

export type ProviderElement<T> = BaseLwElement & {
  type: typeof TYPE_MAP.provider;
  ctx: Context<T>;
  value: T;
  children: LwElement[];
};

export type ComponentProps<P> = P & { children: LwElement[] };

export type ComponentRenderFn<P = void> = (
  props: ComponentProps<P>
) => LwNode;

export type ComponentElement<P> = BaseLwElement & {
  type: typeof TYPE_MAP.cmp;
  props: ComponentProps<P>;
  render: ComponentRenderFn<P>;
  children: LwElement[];
  effects: CmpEffect[];
};

export type HeadElement = BaseLwElement & {
  type: typeof TYPE_MAP.head;
  tag: string;
  props: Record<string, any>;
};

export type CmpEffect = {
  cleanup?: () => void;
  usrCleanup?: () => void;
};

export type LwElement =
  | TextElement
  | HtmlElement
  | ReactiveElement
  | ShowElement
  | ListElement<any>
  | ProviderElement<any>
  | ComponentElement<any>
  | HeadElement;
