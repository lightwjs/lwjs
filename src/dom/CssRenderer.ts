import { MAX_RULES_PER_STYLE_EL } from "../constants";
import { hash, serializeCss } from "../css";
import { CSSObject } from "../types";

export class CssRenderer {
  constructor() {}
  total = 0;
  els: HTMLStyleElement[] = [];
  useStyleSheet = process.env.NODE_ENV === "production";

  cache: CssCache = {};

  hydrate() {}

  createStyleElement() {
    const el = document.createElement("style");
    el.dataset.lw = "";

    return el;
  }

  insertStyleElement(el: HTMLStyleElement) {
    const nextNode = this.els.at(-1)?.nextSibling ?? null;
    document.head.insertBefore(el, nextNode ?? null);
    this.els.push(el);
  }

  insertRule(rule: string) {
    if (this.total % MAX_RULES_PER_STYLE_EL === 0) {
      this.insertStyleElement(this.createStyleElement());
    }

    const el = this.els.at(-1)!;

    if (this.useStyleSheet) {
      const sheet = el.sheet!;
      sheet.insertRule(rule, sheet.cssRules.length);
    }
    //
    else {
      el.appendChild(document.createTextNode(rule));
    }

    this.total++;
  }

  getCssClass(obj: CSSObject) {
    const css = serializeCss(obj);
    const className = `css-${hash(css)}`;

    if (!this.cache[className]) {
      this.cache[className] = 1;
      this.insertRule(`.${className}{${css}}`);
    }

    return className;
  }
}

type CssCache = Record<string, 1>;
