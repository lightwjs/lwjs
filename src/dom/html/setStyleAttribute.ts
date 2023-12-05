import { HtmlElement } from "../../elements";

export const setStyleAttribute = (
  el: HtmlElement,
  styleObj: Record<string, any>
) => {
  const node = el.nodes?.[0];

  for (const key of Object.keys(styleObj)) {
    let v = styleObj[key];

    if (typeof v === "number") {
      v = `${v}px`;
    }
    node.style[key] = v;
  }
};
