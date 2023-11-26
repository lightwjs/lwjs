import { AriaAttributes, AriaRole } from "./aria";
import { DomEventHandler } from "./events";
import {
  Booleanish,
  CSSProperties,
  CrossOrigin,
  LwDomProps,
  LwReactiveProps,
} from "./shared";

export type LwHTMLElementProps<T extends HTMLElement> = LwDomProps<T> &
  LwReactiveProps<HTMLAttributes & AriaAttributes>;

export type HTMLAttributeReferrerPolicy =
  | ""
  | "no-referrer"
  | "no-referrer-when-downgrade"
  | "origin"
  | "origin-when-cross-origin"
  | "same-origin"
  | "strict-origin"
  | "strict-origin-when-cross-origin"
  | "unsafe-url";

export type HTMLElementPropMap = {
  a: HTMLAnchorElementProps;
  abbr: HTMLElementProps;
  address: HTMLElementProps;
  area: HTMLAreaElementProps;
  article: HTMLElementProps;
  aside: HTMLElementProps;
  audio: HTMLAudioElementProps;
  b: HTMLElementProps;
  base: HTMLBaseElementProps;
  bdi: HTMLElementProps;
  bdo: HTMLElementProps;
  big: HTMLElementProps;
  blockquote: HTMLQuoteElementProps;
  body: HTMLBodyElementProps;
  br: HTMLBRElementProps;
  button: HTMLButtonElementProps;
  canvas: HTMLCanvasElementProps;
  caption: HTMLElementProps;
  center: HTMLElementProps;
  cite: HTMLElementProps;
  code: HTMLElementProps;
  col: HTMLTableColElementProps;
  colgroup: HTMLTableColGroupElementProps;
  data: HTMLDataElementProps;
  datalist: HTMLDataListElementProps;
  dd: HTMLElementProps;
  del: HTMLModElementProps;
  details: HTMLDetailsElementProps;
  dfn: HTMLElementProps;
  dialog: HTMLDialogElementProps;
  div: HTMLDivElementProps;
  dl: HTMLDListElementProps;
  dt: HTMLElementProps;
  em: HTMLElementProps;
  embed: HTMLEmbedElementProps;
  fieldset: HTMLFieldSetElementProps;
  figcaption: HTMLElementProps;
  figure: HTMLElementProps;
  footer: HTMLElementProps;
  form: HTMLFormElementProps;
  h1: HTMLHeadingElementProps;
  h2: HTMLHeadingElementProps;
  h3: HTMLHeadingElementProps;
  h4: HTMLHeadingElementProps;
  h5: HTMLHeadingElementProps;
  h6: HTMLHeadingElementProps;
  head: HTMLHeadElementProps;
  header: HTMLElementProps;
  hgroup: HTMLElementProps;
  hr: HTMLHRElementProps;
  html: HTMLHtmlElementProps;
  i: HTMLElementProps;
  iframe: HTMLIFrameElementProps;
  img: HTMLImageElementProps;
  input: HTMLInputElementProps;
  ins: HTMLModElementProps;
  kbd: HTMLElementProps;
  keygen: HTMLKeygenElementProps;
  label: HTMLLabelElementProps;
  legend: HTMLLegendElementProps;
  li: HTMLLIElementProps;
  link: HTMLLinkElementProps;
  main: HTMLElementProps;
  nav: HTMLElementProps;
  object: HTMLObjectElementProps;
  ol: HTMLOListElementProps;
  option: HTMLOptionElementProps;
  p: HTMLParagraphElementProps;
  pre: HTMLPreElementProps;
  progress: HTMLProgressElementProps;
  select: HTMLSelectElementProps;
  small: HTMLElementProps;
  source: HTMLSourceElementProps;
  span: HTMLSpanElementProps;
  strong: HTMLElementProps;
  sub: HTMLElementProps;
  sup: HTMLElementProps;
  table: HTMLTableElementProps;
  tbody: HTMLTableSectionElementProps;
  td: HTMLTableDataCellElementProps;
  textarea: HTMLTextAreaProps;
  tfoot: HTMLTableSectionElementProps;
  thead: HTMLTableSectionElementProps;
  tr: HTMLTableRowProps;
  th: HTMLTableHeaderCellElementProps;
  ul: HTMLUListElementProps;
  video: HTMLVideoElementProps;
  q: HTMLQuoteElementProps;
};

export type HTMLAttributes = {
  // Standard HTML Attributes
  accessKey?: string | undefined;
  autoFocus?: boolean | undefined;
  className?: string | undefined;
  contentEditable?: Booleanish | "inherit" | undefined;
  contextMenu?: string | undefined;
  dir?: string | undefined;
  draggable?: Booleanish | undefined;
  hidden?: boolean | undefined;
  id?: string | undefined;
  lang?: string | undefined;
  nonce?: string | undefined;
  placeholder?: string | undefined;
  slot?: string | undefined;
  spellCheck?: Booleanish | undefined;
  style?: CSSProperties | undefined;
  tabIndex?: number | undefined;
  title?: string | undefined;
  translate?: "yes" | "no" | undefined;

  // Unknown
  radioGroup?: string | undefined; // <command>, <menuitem>

  // WAI-ARIA
  role?: AriaRole | undefined;

  // RDFa Attributes
  about?: string | undefined;
  content?: string | undefined;
  datatype?: string | undefined;
  inlist?: any;
  prefix?: string | undefined;
  property?: string | undefined;
  rel?: string | undefined;
  resource?: string | undefined;
  rev?: string | undefined;
  typeof?: string | undefined;
  vocab?: string | undefined;

  // Non-standard Attributes
  autoCapitalize?: string | undefined;
  autoCorrect?: string | undefined;
  autoSave?: string | undefined;
  color?: string | undefined;
  itemProp?: string | undefined;
  itemScope?: boolean | undefined;
  itemType?: string | undefined;
  itemID?: string | undefined;
  itemRef?: string | undefined;
  results?: number | undefined;
  security?: string | undefined;
  unselectable?: "on" | "off" | undefined;

  // Living Standard
  /**
   * Hints at the type of data that might be entered by the user while editing the element or its contents
   * @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
   */
  inputMode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search"
    | undefined;
  /**
   * Specify that a standard HTML element should behave like a defined custom built-in element
   * @see https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is
   */
  is?: string | undefined;
};

export type HTMLElementProps = LwHTMLElementProps<HTMLElement>;

export type HTMLDivElementProps = LwHTMLElementProps<HTMLDivElement>;

export type HTMLUListElementProps = LwHTMLElementProps<HTMLUListElement>;

export type HTMLLIElementProps = LwHTMLElementProps<HTMLLIElement>;

export type HTMLHeadingElementProps = LwHTMLElementProps<HTMLHeadingElement>;

export type HTMLTableRowProps = LwHTMLElementProps<HTMLTableRowElement>;

export type HTMLSpanElementProps = LwHTMLElementProps<HTMLSpanElement>;

export type HTMLTableSectionElementProps =
  LwHTMLElementProps<HTMLTableSectionElement>;

export type HTMLBRElementProps = LwHTMLElementProps<HTMLBRElement>;

export type HTMLHRElementProps = LwHTMLElementProps<HTMLHRElement>;

export type HTMLLegendElementProps = LwHTMLElementProps<HTMLLegendElement>;

export type HTMLParagraphElementProps =
  LwHTMLElementProps<HTMLParagraphElement>;

export type HTMLPreElementProps = LwHTMLElementProps<HTMLPreElement>;

export type HTMLAudioElementProps = LwHTMLElementProps<HTMLAudioElement>;

export type HTMLBodyElementProps = LwHTMLElementProps<HTMLBodyElement>;

export type HTMLDataListElementProps = LwHTMLElementProps<HTMLDataListElement>;

export type HTMLDListElementProps = LwHTMLElementProps<HTMLDListElement>;

export type HTMLHeadElementProps = LwHTMLElementProps<HTMLHeadElement>;

export type HTMLHtmlElementProps = LwHTMLElementProps<HTMLHtmlElement>;

export type HTMLModElementAttributes = {
  cite?: string | undefined;
  dateTime?: string | undefined;
};

export type HTMLModElementProps = LwHTMLElementProps<HTMLModElement> &
  LwReactiveProps<HTMLModElementAttributes>;

export type HTMLAttributeAnchorTarget =
  | "_self"
  | "_blank"
  | "_parent"
  | "_top"
  | (string & {});

export type HTMLAnchorElementAtributes = {
  download?: any;
  href?: string | undefined;
  hrefLang?: string | undefined;
  media?: string | undefined;
  ping?: string | undefined;
  target?: HTMLAttributeAnchorTarget | undefined;
  type?: string | undefined;
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
};

export type HTMLAnchorElementProps = LwHTMLElementProps<HTMLAnchorElement> &
  LwReactiveProps<HTMLAnchorElementAtributes>;

export type HTMLAreaElementAttributes = {
  alt?: string | undefined;
  coords?: string | undefined;
  download?: any;
  href?: string | undefined;
  hrefLang?: string | undefined;
  media?: string | undefined;
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
  shape?: string | undefined;
  target?: string | undefined;
};

export type HTMLAreaElementProps = LwHTMLElementProps<HTMLAreaElement> &
  LwReactiveProps<HTMLAreaElementAttributes>;

export type HTMLBaseElementAttributes = {
  href?: string | undefined;
  target?: string | undefined;
};

export type HTMLBaseElementProps = LwHTMLElementProps<HTMLBaseElement> &
  LwReactiveProps<HTMLBaseElementAttributes>;

export type HTMLButtonElementAttributes = {
  disabled?: boolean | undefined;
  form?: string | undefined;
  formAction?: string | undefined;
  formEncType?: string | undefined;
  formMethod?: string | undefined;
  formNoValidate?: boolean | undefined;
  formTarget?: string | undefined;
  name?: string | undefined;
  type?: "submit" | "reset" | "button" | undefined;
  value?: string | ReadonlyArray<string> | number | undefined;
};

export type HTMLButtonElementProps = LwHTMLElementProps<HTMLButtonElement> &
  LwReactiveProps<HTMLButtonElementAttributes>;

export type HTMLCanvasElementAttributes = {
  height?: number | string | undefined;
  width?: number | string | undefined;
};

export type HTMLCanvasElementProps = LwHTMLElementProps<HTMLCanvasElement> &
  LwReactiveProps<HTMLCanvasElementAttributes>;

export type HTMLTableColElementAttributes = {
  span?: number | undefined;
  width?: number | string | undefined;
};

export type HTMLTableColElementProps = LwHTMLElementProps<HTMLTableColElement> &
  LwReactiveProps<HTMLTableColElementAttributes>;

export type HTMLTableColGroupElementAttributes = {
  span?: number | undefined;
};

export type HTMLTableColGroupElementProps =
  LwHTMLElementProps<HTMLTableColElement> &
    LwReactiveProps<HTMLTableColGroupElementAttributes>;

export type HTMLDataElementAttributes = {
  value?: string | ReadonlyArray<string> | number | undefined;
};

export type HTMLDataElementProps = LwHTMLElementProps<HTMLDataElement> &
  LwReactiveProps<HTMLDataElementAttributes>;

export type HTMLDetailsElementAttributes = {
  open?: boolean | undefined;
};

export type HTMLDetailsElementEvents = {
  onToggle?: DomEventHandler<HTMLDetailsElement> | undefined;
};

export type HTMLDetailsElementProps = LwHTMLElementProps<HTMLDetailsElement> &
  LwReactiveProps<HTMLDetailsElementAttributes> &
  HTMLDetailsElementEvents;

export type HTMLDialogElementAttributes = {
  open?: boolean | undefined;
};

export type HTMLDialogElementEvents = {
  onCancel?: DomEventHandler<HTMLDialogElement> | undefined;
  onClose?: DomEventHandler<HTMLDialogElement> | undefined;
};

export type HTMLDialogElementProps = LwHTMLElementProps<HTMLDialogElement> &
  LwReactiveProps<HTMLDialogElementAttributes> &
  HTMLDialogElementEvents;

export type HTMLEmbedElementAttributes = {
  height?: number | string | undefined;
  src?: string | undefined;
  type?: string | undefined;
  width?: number | string | undefined;
};

export type HTMLEmbedElementProps = LwHTMLElementProps<HTMLEmbedElement> &
  LwReactiveProps<HTMLEmbedElementAttributes>;

export type HTMLFieldSetElementAttributes = {
  disabled?: boolean | undefined;
  form?: string | undefined;
  name?: string | undefined;
};

export type HTMLFieldSetElementProps = LwHTMLElementProps<HTMLFieldSetElement> &
  LwReactiveProps<HTMLFieldSetElementAttributes>;

export type HTMLFormElementAttributes = {
  acceptCharset?: string | undefined;
  action?: string | undefined;
  autoComplete?: string | undefined;
  encType?: string | undefined;
  method?: string | undefined;
  name?: string | undefined;
  noValidate?: boolean | undefined;
  target?: string | undefined;
};

export type HTMLFormElementProps = LwHTMLElementProps<HTMLFormElement> &
  LwReactiveProps<HTMLFormElementAttributes>;

export type HTMLIFrameElementAttributes = {
  allow?: string | undefined;
  allowFullScreen?: boolean | undefined;
  allowTransparency?: boolean | undefined;
  /** @deprecated */
  frameBorder?: number | string | undefined;
  height?: number | string | undefined;
  loading?: "eager" | "lazy" | undefined;
  /** @deprecated */
  marginHeight?: number | undefined;
  /** @deprecated */
  marginWidth?: number | undefined;
  name?: string | undefined;
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
  sandbox?: string | undefined;
  /** @deprecated */
  scrolling?: string | undefined;
  seamless?: boolean | undefined;
  src?: string | undefined;
  srcDoc?: string | undefined;
  width?: number | string | undefined;
};

export type HTMLIFrameElementProps = LwHTMLElementProps<HTMLIFrameElement> &
  LwReactiveProps<HTMLIFrameElementAttributes>;

export type HTMLImageElementAttributes = {
  alt?: string | undefined;
  crossOrigin?: CrossOrigin;
  decoding?: "async" | "auto" | "sync" | undefined;
  height?: number | string | undefined;
  loading?: "eager" | "lazy" | undefined;
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
  sizes?: string | undefined;
  src?: string | undefined;
  srcSet?: string | undefined;
  useMap?: string | undefined;
  width?: number | string | undefined;
};

export type HTMLImageElementProps = LwHTMLElementProps<HTMLImageElement> &
  LwReactiveProps<HTMLImageElementAttributes>;

export type HTMLInputTypeAttribute =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week"
  | (string & {});

export type HTMLInputElementAttributes = {
  accept?: string | undefined;
  alt?: string | undefined;
  autoComplete?: string | undefined;
  capture?: boolean | "user" | "environment" | undefined; // https://www.w3.org/TR/html-media-capture/#the-capture-attribute
  checked?: boolean | undefined;
  crossOrigin?: "anonymous" | "use-credentials" | "" | undefined;
  disabled?: boolean | undefined;
  enterKeyHint?:
    | "enter"
    | "done"
    | "go"
    | "next"
    | "previous"
    | "search"
    | "send"
    | undefined;
  form?: string | undefined;
  formAction?: string | undefined;
  formEncType?: string | undefined;
  formMethod?: string | undefined;
  formNoValidate?: boolean | undefined;
  formTarget?: string | undefined;
  height?: number | string | undefined;
  list?: string | undefined;
  max?: number | string | undefined;
  maxLength?: number | undefined;
  min?: number | string | undefined;
  minLength?: number | undefined;
  multiple?: boolean | undefined;
  name?: string | undefined;
  pattern?: string | undefined;
  placeholder?: string | undefined;
  readOnly?: boolean | undefined;
  required?: boolean | undefined;
  size?: number | undefined;
  src?: string | undefined;
  step?: number | string | undefined;
  type?: HTMLInputTypeAttribute | undefined;
  value?: string | ReadonlyArray<string> | number | undefined;
  width?: number | string | undefined;
};

export type HTMLInputElementProps = LwHTMLElementProps<HTMLInputElement> &
  LwReactiveProps<HTMLInputElementAttributes>;

export type HTMLKeygenElementAttributes = {
  challenge?: string | undefined;
  disabled?: boolean | undefined;
  form?: string | undefined;
  keyType?: string | undefined;
  keyParams?: string | undefined;
  name?: string | undefined;
};

export type HTMLKeygenElementProps = LwHTMLElementProps<HTMLElement> &
  LwReactiveProps<HTMLKeygenElementAttributes>;

export type HTMLLabelElementAttributes = {
  form?: string | undefined;
  htmlFor?: string | undefined;
};

export type HTMLLabelElementProps = LwHTMLElementProps<HTMLLabelElement> &
  LwReactiveProps<HTMLLabelElementAttributes>;

export type HTMLLinkElementAttributes = {
  as?: string | undefined;
  crossOrigin?: CrossOrigin;
  fetchPriority?: "high" | "low" | "auto";
  href?: string | undefined;
  hrefLang?: string | undefined;
  integrity?: string | undefined;
  media?: string | undefined;
  imageSrcSet?: string | undefined;
  imageSizes?: string | undefined;
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
  sizes?: string | undefined;
  type?: string | undefined;
  charSet?: string | undefined;
};

export type HTMLLinkElementProps = LwHTMLElementProps<HTMLLinkElement> &
  LwReactiveProps<HTMLLinkElementAttributes>;

export type HTMLObjectElementAttributes = {
  classID?: string | undefined;
  data?: string | undefined;
  form?: string | undefined;
  height?: number | string | undefined;
  name?: string | undefined;
  type?: string | undefined;
  useMap?: string | undefined;
  width?: number | string | undefined;
  wmode?: string | undefined;
};

export type HTMLObjectElementProps = LwHTMLElementProps<HTMLObjectElement> &
  LwReactiveProps<HTMLObjectElementAttributes>;

export type HTMLOListElementAttributes = {
  reversed?: boolean | undefined;
  start?: number | undefined;
  type?: "1" | "a" | "A" | "i" | "I" | undefined;
};

export type HTMLOListElementProps = LwHTMLElementProps<HTMLOListElement> &
  LwReactiveProps<HTMLOListElementAttributes>;

export type HTMLOptionElementAttributes = {
  disabled?: boolean | undefined;
  label?: string | undefined;
  selected?: boolean | undefined;
  value?: string | ReadonlyArray<string> | number | undefined;
};

export type HTMLOptionElementProps = LwHTMLElementProps<HTMLOptionElement> &
  LwReactiveProps<HTMLOptionElementAttributes>;

export type HTMLProgressElementAttributes = {
  max?: number | string | undefined;
  value?: string | ReadonlyArray<string> | number | undefined;
};

export type HTMLProgressElementProps = LwHTMLElementProps<HTMLProgressElement> &
  LwReactiveProps<HTMLProgressElementAttributes>;

export type HTMLQuoteElementAttributes = {
  cite?: string | undefined;
};

export type HTMLQuoteElementProps = LwHTMLElementProps<HTMLQuoteElement> &
  LwReactiveProps<HTMLQuoteElementAttributes>;

export type HTMLSelectElementAttributes = {
  autoComplete?: string | undefined;
  disabled?: boolean | undefined;
  form?: string | undefined;
  multiple?: boolean | undefined;
  name?: string | undefined;
  required?: boolean | undefined;
  size?: number | undefined;
  value?: string | ReadonlyArray<string> | number | undefined;
};

export type HTMLSelectElementProps = LwHTMLElementProps<HTMLSelectElement> &
  LwReactiveProps<HTMLSelectElementAttributes>;

export type HTMLSourceElementAttributes = {
  height?: number | string | undefined;
  media?: string | undefined;
  sizes?: string | undefined;
  src?: string | undefined;
  srcSet?: string | undefined;
  type?: string | undefined;
  width?: number | string | undefined;
};

export type HTMLSourceElementProps = LwHTMLElementProps<HTMLSourceElement> &
  LwReactiveProps<HTMLSourceElementAttributes>;

export type TableHTMLAttributes = {
  align?: "left" | "center" | "right" | undefined;
  bgcolor?: string | undefined;
  border?: number | undefined;
  cellPadding?: number | string | undefined;
  cellSpacing?: number | string | undefined;
  frame?: boolean | undefined;
  rules?: "none" | "groups" | "rows" | "columns" | "all" | undefined;
  summary?: string | undefined;
  width?: number | string | undefined;
};

export type HTMLTableElementProps = LwHTMLElementProps<HTMLTableElement> &
  LwReactiveProps<TableHTMLAttributes>;

export type HTMLTableDataCellAttributes = {
  align?: "left" | "center" | "right" | "justify" | "char" | undefined;
  colSpan?: number | undefined;
  headers?: string | undefined;
  rowSpan?: number | undefined;
  scope?: string | undefined;
  abbr?: string | undefined;
};

export type HTMLTableDataCellElementProps =
  LwHTMLElementProps<HTMLTableCellElement> &
    LwReactiveProps<HTMLTableDataCellAttributes>;

export type HTMLTextAreaAttributes = {
  autoComplete?: string | undefined;
  cols?: number | undefined;
  dirName?: string | undefined;
  disabled?: boolean | undefined;
  form?: string | undefined;
  maxLength?: number | undefined;
  minLength?: number | undefined;
  name?: string | undefined;
  placeholder?: string | undefined;
  readOnly?: boolean | undefined;
  required?: boolean | undefined;
  rows?: number | undefined;
  value?: string | ReadonlyArray<string> | number | undefined;
  wrap?: string | undefined;
};

export type HTMLTextAreaProps = LwHTMLElementProps<HTMLTextAreaElement> &
  LwReactiveProps<HTMLTextAreaAttributes>;

export type HTMLTableHeaderCellElementAttributes = {
  align?: "left" | "center" | "right" | "justify" | "char" | undefined;
  colSpan?: number | undefined;
  headers?: string | undefined;
  rowSpan?: number | undefined;
  scope?: string | undefined;
  abbr?: string | undefined;
};

export type HTMLTableHeaderCellElementProps =
  LwHTMLElementProps<HTMLTableCellElement> &
    LwReactiveProps<HTMLTableHeaderCellElementAttributes>;

export type HTMLVideElementAttributes = {
  height?: number | string | undefined;
  playsInline?: boolean | undefined;
  poster?: string | undefined;
  width?: number | string | undefined;
  disablePictureInPicture?: boolean | undefined;
  disableRemotePlayback?: boolean | undefined;
};

export type HTMLVideoElementProps = LwHTMLElementProps<HTMLVideoElement> &
  LwReactiveProps<HTMLVideElementAttributes>;
