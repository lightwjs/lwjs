import {
  ComponentElement,
  HeadElement,
  HtmlElement,
  ListElement,
  OutletElement,
  ProviderElement,
  ReactiveElement,
  ShowElement,
  TextElement,
} from "../elements";
import { Computed, Effect, Signal } from "../reactive";

export const TYPE_MAP = {
  txt: Symbol.for("lw-text"),
  html: Symbol.for("lw-html"),
  show: Symbol.for("lw-show"),
  list: Symbol.for("lw-list"),
  reactive: Symbol.for("lw-reactive"),
  provider: Symbol.for("lw-provider"),
  component: Symbol.for("lw-component"),
  head: Symbol.for("lw-head"),
  outlet: Symbol.for("lw-outlet"),
  signal: Symbol.for("lw-signal"),
  computed: Symbol.for("lw-computed"),
  effect: Symbol.for("lw-effect"),
};

export type TypeMap = {
  txt: TextElement;
  html: HtmlElement;
  show: ShowElement;
  list: ListElement<any>;
  reactive: ReactiveElement;
  provider: ProviderElement<any>;
  component: ComponentElement<any>;
  head: HeadElement;
  outlet: OutletElement;
  signal: Signal;
  computed: Computed;
  effect: Effect;
};
