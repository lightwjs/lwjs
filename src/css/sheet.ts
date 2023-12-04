export const createSheet = ({ container, insertionPoint }: Options) => {
  const useStyleSheet = process.env.NODE_ENV === "production";
  let total = 0;
  const els: HTMLStyleElement[] = [];

  const createStyleElement = () => {
    const el = document.createElement("style");
    el.dataset.lwjs = "";

    return el;
  };

  const insertStyleElement = (el: HTMLStyleElement) => {
    let nextNode = null;
    if (els.length === 0 && insertionPoint) {
      nextNode = insertionPoint.nextSibling;
    }
    //
    else {
      nextNode = els.at(-1)?.nextSibling;
    }
    container.insertBefore(el, nextNode ?? null);
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

  return {
    insertRule,
  };
};

const MAX_RULES_PER_STYLE_EL = 65000;

type Options = {
  container: Node;
  insertionPoint?: Node;
};
