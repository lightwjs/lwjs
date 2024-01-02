import { LW_EL_SYMBOL, TYPE_MAP } from "../constants";
import { Effect, ReactiveValue, State } from "../reactive";
import { BaseLwElement, LwElement, LwNode } from "../types";
import { HtmlElement } from "./HtmlElement";

export class ListElement<Item> implements BaseLwElement {
  constructor(
    public arr: ReactiveValue<Item[]>,
    public renderItem: ListElementRenderItemFn<Item>
  ) {}
  brand = LW_EL_SYMBOL;
  type = TYPE_MAP.list;
  htmlParent?: HtmlElement;
  nextEl?: LwElement;
  nodes?: any[];
  parent?: LwElement;
  prevArr: Item[] = [];
  children: LwElement[] = [];
  cache: ListElementCache<Item> = new Map();
  effects?: Effect[];
}

export const list = <Item>(
  arr: ReactiveValue<Item[]>,
  renderItem: ListElementRenderItemFn<Item>
): ListElement<Item> => {
  return new ListElement(arr, renderItem);
};

type ListElementRenderItemFn<Item> = (
  item: Item,
  index: State<number>
) => LwNode;

export type ListElementCache<Item> = Map<Item, ListCacheItem>;

export type ListCacheItem = {
  els: LwElement[];
  nodes: any[];
  index: State<number>;
};
