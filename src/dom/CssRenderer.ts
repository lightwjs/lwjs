import { MAX_RULES_PER_STYLE_EL } from "../constants";
import { getCssRules } from "../css";
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
    const rules = getCssRules(obj);

    for (const rule of rules) {
      if (!this.cache[rule.hash]) {
        this.cache[rule.hash] = 1;
        this.insertRule(`${rule.selector}{${rule.css}}`);
      }
    }

    return rules[0].selector.slice(1);
  }
}

type CssCache = Record<string, 1>;
