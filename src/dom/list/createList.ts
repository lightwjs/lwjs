import { ListElement } from "../../elements";
import { syncEffect } from "../../reactive";
import { createDomNodes } from "../createDomNodes";
import { createListItem } from "./createListItem";
import { patchList } from "./patchList";

export const createList = <Item>(el: ListElement<Item>) => {
  const arr = el.arr.value;
  el.prevArr = arr;
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    const item = arr[i];
    const cacheItem = createListItem(arr[i], i, el);
    el.children.push(...cacheItem.els);
    el.cache.set(item, cacheItem);
  }

  let didInit = false;

  syncEffect(() => {
    el.arr.value;
    if (!didInit) return;
    patchList(el);
  });

  didInit = true;

  return createDomNodes(el.children, el);
};
