import { ListCacheItem, ListElement, createElements } from "../../elements";
import { signal } from "../../reactive";
import { createDomNodes } from "../createDomNodes";

export const createListItem = <Item>(
  item: Item,
  i: number,
  el: ListElement<Item>
): ListCacheItem => {
  const index = signal(i);
  const els = createElements(el.renderItem(item, index));
  const nodes = createDomNodes(els, el);
  return {
    els,
    nodes,
    index,
  };
};
