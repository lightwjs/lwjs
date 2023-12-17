import {
  ComponentElement,
  HeadElement,
  HtmlElement,
  ListElement,
  ProviderElement,
  ReactiveElement,
  ShowElement,
  TextElement,
} from "../elements";
import { Effect } from "../reactive";

export interface BaseLwElement {
  brand: symbol;
  nextEl?: LwElement;
  nodes?: any[];
  parent?: LwElement;
  htmlParent?: HtmlElement;
  effects?: Effect[];
}

export type LwElement =
  | TextElement
  | HtmlElement
  | ReactiveElement
  | ShowElement
  | ListElement<any>
  | ProviderElement<any>
  | ComponentElement<any>
  | HeadElement;
