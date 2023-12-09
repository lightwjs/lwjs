import {
  ListCacheItem,
  ListElement,
  ListElementCache,
  createElements,
} from "../elements";
import { Signal, syncEffect } from "../reactive";
import { LwElement } from "../types";
import { DomRenderer } from "./DomRenderer";
import { findNextNode } from "./findNextNode";
import { getDomParent } from "./getDomParent";
import { removeElement } from "./removeElement";
import { DomNode } from "./types";

export const createListElementDom = <Item>(
  el: ListElement<Item>,
  renderer: DomRenderer
) => {
  const arr = el.arr.value;
  el.prevArr = arr;
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    const item = arr[i];
    const cacheItem = createListItem(arr[i], i, el, renderer);
    el.children.push(...cacheItem.els);
    el.cache.set(item, cacheItem);
  }

  let didInit = false;

  const eff = syncEffect(() => {
    el.arr.value;
    if (!didInit) return;
    patchList(el, renderer);
  });

  didInit = true;

  el.nodes = renderer.create(el.children, el);
  el.effects = [eff];
};

const createListItem = <Item>(
  item: Item,
  i: number,
  el: ListElement<Item>,
  renderer: DomRenderer
): ListCacheItem => {
  const index = new Signal(i);
  const els = createElements(el.renderItem(item, index));
  const nodes = renderer.create(els, el);
  return {
    els,
    nodes,
    index,
  };
};

const patchList = <Item>(el: ListElement<Item>, renderer: DomRenderer) => {
  const oldArr = el.prevArr;
  const newArr = el.arr.value;
  const oldLen = oldArr.length;
  const newLen = el.arr.value.length;
  el.prevArr = [...newArr];

  // fast path for prev empty
  if (oldLen === 0) {
    const newCache = new Map();
    el.nodes = [];
    el.children = [];
    for (let i = 0; i < newLen; i++) {
      const item = newArr[i];
      const cacheItem = createListItem(item, i, el, renderer);
      newCache.set(item, cacheItem);
      el.nodes.push(...cacheItem.nodes);
    }
    const domParent = getDomParent(el);

    if (domParent) {
      const nextNode = findNextNode(el);

      for (const node of el.nodes) {
        domParent.insertBefore(node, nextNode ?? null);
      }
    }

    el.cache = newCache;
  }
  // fast path for new empty
  else if (newLen === 0) {
    for (const childEl of el.children!) {
      removeElement(childEl);
    }
    el.children = [];
    el.cache.clear();
  }
  //
  else {
    const newCache: ListElementCache<Item> = new Map();
    const toBeInserted: ListInsertSegment[] = [];
    el.nodes = [];

    const addToInsert = (cacheItem: ListCacheItem) => {
      const last = toBeInserted.at(-1);
      const index = cacheItem.index.value;

      const nodes = cacheItem.nodes;
      el.nodes?.push(...nodes);

      if (last?.start === index - 1) {
        const insertSeg = toBeInserted.at(-1)!;
        insertSeg.nodes.push(...nodes);
        insertSeg.start = index;
      }
      //
      else {
        toBeInserted.push({
          start: index,
          nodes: [...nodes],
        });
      }
    };

    for (let i = 0; i < newLen; i++) {
      const item = newArr[i];
      const oldCacheItem = el.cache.get(item);

      // old item
      if (oldCacheItem) {
        // position changed
        if (oldCacheItem.index.value !== i) {
          oldCacheItem.index.value = i;
          addToInsert(oldCacheItem);
        }
        //
        else {
          el.nodes.push(...oldCacheItem.nodes);
        }
        newCache.set(item, oldCacheItem);
      }
      // new item
      else {
        const cacheItem = createListItem(item, i, el, renderer);
        newCache.set(item, cacheItem);
        addToInsert(cacheItem);
      }
    }

    const toBeRemoved: LwElement[] = [];

    for (let i = 0; i < oldLen; i++) {
      const item = oldArr[i];
      const cacheItem = newCache.get(item);
      // old item no longer present
      if (!cacheItem) {
        const oldCacheItem = el.cache.get(item)!;
        toBeRemoved.push(...oldCacheItem.els);
      }
    }

    el.cache = newCache;

    // remove
    for (const elToBeRemoved of toBeRemoved) {
      removeElement(elToBeRemoved);
    }

    // insert
    const domParent = getDomParent(el);
    for (const obj of toBeInserted) {
      let nextNode = null;
      const nextEl = el.children[obj.start];
      if (nextEl) {
        nextNode = findNextNode(nextEl);
      }
      //
      else {
        nextNode = findNextNode(el);
      }

      for (const node of obj.nodes) {
        domParent.insertBefore(node, nextNode);
      }
    }
  }
};

type ListInsertSegment = {
  start: number;
  nodes: DomNode[];
};
