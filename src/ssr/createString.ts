import { TYPE_MAP } from "../constants";
import {
  ComponentElement,
  ListElement,
  ProviderElement,
  ReactiveElement,
  ShowElement,
  TextElement,
  createElements,
} from "../elements";
import { State } from "../reactive";
import { LwElement } from "../types";
import { htmlElToString } from "./html";

export const createString = (elements: LwElement[]): string => {
  return elements.map((el) => CREATE_EL_DOM_MAP[el.type](el as any)).join("");
};

const listElToString = <Item>(el: ListElement<Item>) => {
  const len = el.arr.value.length;
  for (let i = 0; i < len; i++) {
    const item = el.arr.value[i];
    const index = new State(i);
    const els = createElements(el.renderItem(item, index));
    el.children.push(...els);
  }
  return createString(el.children);
};

const CREATE_EL_DOM_MAP = {
  [TYPE_MAP.html]: htmlElToString,
  [TYPE_MAP.show]: (el: ShowElement) =>
    createString(el.reactive.value ? el.yesElements : el.noElements),
  [TYPE_MAP.txt]: (el: TextElement) => el.text,
  [TYPE_MAP.reactive]: (el: ReactiveElement) => el.reactive.value,
  [TYPE_MAP.list]: listElToString,
  [TYPE_MAP.provider]: (el: ProviderElement<any>) => createString(el.children),
  [TYPE_MAP.component]: (el: ComponentElement<any>) => {
    const els = createElements(el.render(el.props));
    return createString(els);
  },
  [TYPE_MAP.head]: () => "",
};
