import { LW_EL_SYMBOL, TYPE_MAP } from "../constants";
import { ReactiveValue, Signal } from "../reactive";
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
}

export const list = <Item>(
  arr: ReactiveValue<Item[]>,
  renderItem: ListElementRenderItemFn<Item>
): ListElement<Item> => {
  return new ListElement(arr, renderItem);
};

type ListElementRenderItemFn<Item> = (
  item: Item,
  index: Signal<number>
) => LwNode;

export type ListElementCache<Item> = Map<Item, ListCacheItem>;

export type ListCacheItem = {
  els: LwElement[];
  nodes: any[];
  index: Signal<number>;
};
