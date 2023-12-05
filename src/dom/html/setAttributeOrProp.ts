import { HtmlElement } from "../../elements";
import { setStyleAttribute } from "./setStyleAttribute";

export const setAttributeOrProp = (
  el: HtmlElement,
  key: string,
  value: any
) => {
  const node = el.nodes?.[0];
  if (!node) return;
  if (key === "style") {
    setStyleAttribute(el, value);
  }
  //
  else if (key === "css") {
    // if (isFunction(value)) {
    //   syncEffect(() => {
    //     setCssClass(node, value());
    //   });
    // }
    // //
    // else {
    //   setCssClass(node, value);
    // }
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

// const sheet = createSheet({ container: document.head });

// const setCssClass = (node: HTMLElement, value: any) => {
//   const css = serializeCss(value);
//   const className = `css-${hash(css)}`;

//   sheet.insertRule(`.${className}{${css}}`);
//   node.classList.add(className);
// };
