import {
  ComponentElement,
  HtmlElement,
  ListCacheItem,
  ListElement,
  MintElement,
  ProviderElement,
  ReactiveElement,
  ShowElement,
  TextElement,
  computed,
  createElements,
  createHtmlElement,
  currentCmp,
  getEventTypeFromPropKey,
  instantEffect,
  isEventProp,
  isSignal,
  signal,
} from "../core";

type DomNode = HTMLElement | Text;

export const createDomNodes = (
  elements: MintElement[],
  parent: MintElement
): DomNode[] => {
  const domNodes: DomNode[] = [];

  let result;
  const len = elements.length;

  for (let i = 0; i < len; i++) {
    const prevEl = elements[i - 1];
    const el = elements[i];
    if (prevEl) {
      prevEl.nextEl = el;
    }

    el.parent = parent;
    if (parent.type === "html") {
      el.htmlParent = parent;
    }
    //
    else {
      el.htmlParent = parent.htmlParent;
    }
    // @ts-ignore
    result = elDomMap[el.type](el);
    el.nodes = Array.isArray(result) ? result : [result];

    if (Array.isArray(result)) {
      domNodes.push(...result);
    }
    //
    else {
      domNodes.push(result);
    }
  }

  return domNodes;
};

const htmlElToDom = (el: HtmlElement) => {
  const dom = document.createElement(el.tag);
  el.nodes = [dom];

  dom.append(...createDomNodes(el.children, el));

  const keys = Object.keys(el.props);

  for (const key of keys) {
    const value = el.props[key];

    if (isEventProp(key)) {
      dom.addEventListener(getEventTypeFromPropKey(key), value);
    }
    //
    else {
      if (isSignal(value)) {
        instantEffect(() => {
          setAttributeOrProp(el, key, value.value);
        });
      }
      //
      else {
        setAttributeOrProp(el, key, value);
      }
    }
  }

  return dom;
};

const setStyleAttribute = (el: HtmlElement, styleObj: Record<string, any>) => {
  const node = el.nodes?.[0];

  const keys = Object.keys(styleObj);

  for (const key of keys) {
    let v = styleObj[key];

    if (typeof v === "number") {
      v = `${v}px`;
    }
    node.style[key] = v;
  }
};

const setAttributeOrProp = (el: HtmlElement, key: string, value: any) => {
  const node = el.nodes?.[0];
  if (!node) return;
  if (key === "style") {
    setStyleAttribute(el, value);
  }
  //
  else if (PROP_MAP[key]) {
    (node as any)[key] = value;
  }
  //
  else {
    node.setAttribute(ATTRIBUTE_ALIASES[key] ?? key, value as any);
  }
};

// html props treated as element properties ( not attributes )
const PROP_MAP: any = {
  checked: 1,
  selected: 1,
  type: 1,
  value: 1,
};

const ATTRIBUTE_ALIASES: Record<string, string> = {
  className: "class",
  htmlFor: "for",
};

const textElToDom = (el: TextElement) => {
  return new Text(el.text);
};

const reactiveElToDom = (el: ReactiveElement) => {
  const node = new Text(el.rct.value);

  instantEffect(() => {
    node.textContent = el.rct.value;
  });

  return node;
};

const removeShowEls = (els: MintElement[]) => {
  for (const e of els) {
    if (e.type === "cmp") {
      for (const eff of e.effects) {
        eff.usrCleanup?.();
        eff.cleanup?.();
      }
    }
    if (e.nodes == null) continue;
    for (const node of e.nodes) {
      node.remove();
    }
    e.nodes = [];
  }
};

const showElToDom = (el: ShowElement) => {
  let prevCond: boolean | undefined;

  instantEffect(() => {
    const cond = !!el.rct.value;

    el.children = cond ? el.yes : el.no;

    if (prevCond != null && cond !== prevCond) {
      const elsToBeRemoved = cond ? el.no : el.yes;
      removeShowEls(elsToBeRemoved);
      const nodes = createDomNodes(el.children, el);
      el.nodes = nodes;
      const nextNode = findNextNode(el);
      const parentNode = el.htmlParent?.nodes?.[0];

      if (parentNode) {
        for (const n of nodes) {
          parentNode.insertBefore(n, nextNode ?? null);
        }
      }
    }
    prevCond = cond;
  });
  return createDomNodes(el.children, el);
};

const createListItem = <Item>(item: Item, i: number, el: ListElement<Item>) => {
  const index = signal(i);
  const compIndex = computed(() => index.value);
  const els = createElements(el.renderItem(item, compIndex));
  const nodes = createDomNodes(els, el);
  const cacheItem: ListCacheItem = {
    els: els,
    nodes,
    index,
    compIndex,
  };
  return cacheItem;
};

const listElToDom = <Item>(el: ListElement<Item>) => {
  const arr = el.rct.value;
  el.prevArr = arr;
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    const item = arr[i];
    const cacheItem = createListItem(arr[i], i, el);
    el.children.push(...cacheItem.els);
    el.cache.set(item, cacheItem);
  }

  let didInit = false;

  instantEffect(() => {
    el.rct.value;
    if (!didInit) return;
    const oldArr = el.prevArr;
    const newArr = el.rct.value;
    const oldLen = oldArr.length;
    const newLen = el.rct.value.length;
    el.prevArr = [...newArr];

    // fast path for prev empty
    if (oldLen === 0) {
      const newCache = new Map();
      el.nodes = [];
      el.children = [];
      for (let i = 0; i < newLen; i++) {
        const item = newArr[i];
        const cacheItem = createListItem(item, i, el);
        newCache.set(item, cacheItem);
        el.children.push(...cacheItem.els);
        el.nodes.push(...cacheItem.nodes);
      }
      const parentNode = el.htmlParent?.nodes?.[0];

      if (parentNode) {
        const nextNode = findNextNode(el);

        for (const node of el.nodes) {
          parentNode.insertBefore(node, nextNode ?? null);
        }
      }

      el.cache = newCache;
    }
    // fast path for new empty
    else if (newLen === 0) {
      if (el.nodes) {
        for (const node of el.nodes) {
          node.remove();
        }
      }
      el.cache.clear();
    }
    //
    else {
      const newCache = new Map();
      const toBeInserted: any[] = [];
      const toBeRemoved: ListCacheItem[] = [];

      const addToInsert = (cacheItem: ListCacheItem) => {
        const last = toBeInserted.at(-1);
        const index = cacheItem.index.value;

        if (last?.end === index + 1) {
          toBeInserted.at(-1).nodes.push(...cacheItem.nodes);
        }
        //
        else {
          toBeInserted.push({
            end: index,
            nodes: [...cacheItem.nodes],
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
          newCache.set(item, oldCacheItem);
        }
        // new item
        else {
          const cacheItem = createListItem(item, i, el);
          newCache.set(item, cacheItem);
          addToInsert(cacheItem);
        }
      }

      for (let i = 0; i < oldLen; i++) {
        const item = oldArr[i];
        const cacheItem = newCache.get(item);
        // old item no longer present
        if (!cacheItem) {
          toBeRemoved.push(cacheItem);
        }
      }

      el.cache = newCache;

      // remove
      for (const cacheItem of toBeRemoved) {
        for (const node of cacheItem.nodes) {
          node.remove();
        }
      }

      // insert
      const parentNode = el.htmlParent?.nodes?.[0];
      for (const obj of toBeInserted) {
        let nextNode = null;
        const nextEl = el.children[obj.end];
        if (nextEl) {
          nextNode = findNextNode(nextEl);
        }
        for (const node of obj.nodes) {
          parentNode.insertBefore(node, nextNode);
        }
      }
    }
  });

  didInit = true;

  return createDomNodes(el.children, el);
};

const findNextNode = (el: MintElement): DomNode | undefined => {
  let nextEl = el.nextEl;

  while (nextEl) {
    const nextNode = nextEl.nodes?.[0];
    if (nextNode) {
      return nextNode;
    }
    nextEl = nextEl.nextEl;
  }

  if (el.parent && el.parent.htmlParent === el.htmlParent) {
    return findNextNode(el.parent);
  }
};

const componentElToDom = <P>(el: ComponentElement<P>) => {
  currentCmp.set(el);
  el.children = createElements(el.render(el.props));
  currentCmp.set(undefined);
  return createDomNodes(el.children, el);
};

const elDomMap = {
  html: htmlElToDom,
  txt: textElToDom,
  rct: reactiveElToDom,
  show: showElToDom,
  list: listElToDom,
  provider: (el: ProviderElement<any>) => {
    return createDomNodes(el.children, el);
  },
  cmp: componentElToDom,
} as const;

export const render = (node: any, container: HTMLElement) => {
  const els = createElements(node);

  const containerEl = createHtmlElement(
    container.tagName.toLowerCase(),
    {},
    els
  );
  containerEl.nodes = [container];

  const domNodes = createDomNodes(els, containerEl);

  container.append(...domNodes);
};
