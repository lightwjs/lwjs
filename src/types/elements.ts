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

export interface BaseLwElement {
  brand: Symbol;
  nextEl?: LwElement;
  nodes?: any[];
  parent?: LwElement;
  htmlParent?: HtmlElement;
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
