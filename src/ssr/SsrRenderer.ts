import { TYPE_MAP } from "../constants";
import {
  ComponentApi,
  ComponentElement,
  ListElement,
  ProviderElement,
  ReactiveElement,
  ShowElement,
  TextElement,
  createElements,
} from "../elements";
import { ReactiveContext, Signal } from "../reactive";
import { LwElement, LwNode, Renderer } from "../types";
import { CssRenderer } from "./CssRenderer";
import { htmlElToString } from "./html";

export class SsrRenderer implements Renderer {
  constructor() {
    this.ctx = new ReactiveContext();
    this.cssRenderer = new CssRenderer();
  }
  ctx;
  cssRenderer;

  create(elements: LwElement[]): string {
    return elements
      .map((el) => CREATE_EL_DOM_MAP[el.type](el as any, this))
      .join("");
  }

  render(node: LwNode) {
    const els = createElements(node);
    const bodyHtml = this.create(els);

    return `<head></head><body>${bodyHtml}</body>`;
  }
}

const listElToString = <Item>(el: ListElement<Item>, renderer: SsrRenderer) => {
  const len = el.arr.value.length;
  for (let i = 0; i < len; i++) {
    const item = el.arr.value[i];
    const index = new Signal(i, renderer.ctx);
    const els = createElements(el.renderItem(item, index));
    el.children.push(...els);
  }
  return renderer.create(el.children);
};

const CREATE_EL_DOM_MAP = {
  [TYPE_MAP.html]: htmlElToString,
  [TYPE_MAP.show]: (el: ShowElement, renderer: SsrRenderer) =>
    renderer.create(el.reactive.value ? el.yesElements : el.noElements),
  [TYPE_MAP.txt]: (el: TextElement) => el.text,
  [TYPE_MAP.reactive]: (el: ReactiveElement) => el.reactive.value,
  [TYPE_MAP.list]: listElToString,
  [TYPE_MAP.provider]: (el: ProviderElement<any>, renderer: SsrRenderer) =>
    renderer.create(el.children),
  [TYPE_MAP.component]: (el: ComponentElement<any>, renderer: SsrRenderer) => {
    const api = new ComponentApi(el, renderer);
    const els = createElements(el.render(api));
    return renderer.create(els);
  },
  [TYPE_MAP.head]: () => "",
};
