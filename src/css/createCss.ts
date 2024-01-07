import { MAX_RULES_PER_STYLE_EL } from "../constants";
import { CSSObject } from "../types";
import { getCssRules } from "./getCssRules";

export const createCss = () => {
  let total = 0;
  const els: HTMLStyleElement[] = [];
  const useStyleSheet = process.env.NODE_ENV === "production";

  const cache: CssCache = {};

  const insertStyleElement = (el: HTMLStyleElement) => {
    const nextNode = els.at(-1)?.nextSibling ?? null;
    document.head.insertBefore(el, nextNode ?? null);
    els.push(el);
  };

  const insertRule = (rule: string) => {
    if (total % MAX_RULES_PER_STYLE_EL === 0) {
      insertStyleElement(createStyleElement());
    }

    const el = els.at(-1)!;

    if (useStyleSheet) {
      const sheet = el.sheet!;
      sheet.insertRule(rule, sheet.cssRules.length);
    }
    //
    else {
      el.appendChild(document.createTextNode(rule));
    }

    total++;
  };

  const getCssClass = (obj: CSSObject) => {
    const rules = getCssRules(obj);

    for (const rule of rules) {
      if (!cache[rule.hash]) {
        cache[rule.hash] = true;
        insertRule(`${rule.selector}{${rule.css}}`);
      }
    }

    return rules[0].selector.slice(1);
  };

  return {
    getCssClass,
  };
};

const createStyleElement = () => {
  const el = document.createElement("style");
  el.dataset.lw = "";

  return el;
};

type CssCache = Record<string, true>;
