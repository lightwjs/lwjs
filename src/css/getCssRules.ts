import { CSSObject } from "../types";
import { hash } from "./hash";

export const getCssRules = (cssObject: CSSObject): FinishedRule[] => {
  const finishedRule = handleCssObject(cssObject);

  const hashString = hash(finishedRule.css);
  const className = `lw-${hashString}`;
  const selector = `.${className}`;

  return [
    {
      hash: hashString,
      css: finishedRule.css,
      selector,
    },
    ...handleCssRules(selector, finishedRule.rules),
  ];
};

const handleCssRules = (parentSelector: string, rules: RawRule[]) => {
  let result: FinishedRule[] = [];

  for (const rule of rules) {
    let selector;

    if (rule.key.indexOf("&") === 0) {
      selector = rule.key.replace(/&/g, parentSelector);
    }
    //
    else if (rule.key.indexOf(":") === 0) {
      selector = `${parentSelector}${rule.key}`;
    }
    //
    else {
      selector = `${parentSelector} ${rule.key}`;
    }

    result.push(
      {
        hash: rule.hash,
        selector,
        css: rule.css,
      },
      ...handleCssRules(selector, rule.rules)
    );
  }

  return result;
};

const handleCssObject = (cssObject: CSSObject, key?: string) => {
  const result: RawRule = {
    key: key!,
    css: "",
    hash: "",
    rules: [],
  };

  const keys = Object.keys(cssObject);

  for (const key of keys) {
    let v = cssObject[key];

    if (typeof v === "object") {
      result.rules.push(handleCssObject(v, key));
      continue;
    }

    let k = key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);

    if (typeof v === "number") {
      v = `${v}px`;
    }

    result.css += `${k}:${v};`;
  }
  result.hash = hash(result.css);

  return result;
};

type RawRule = {
  key: string;
  hash: string;
  css: string;
  rules: RawRule[];
};

type FinishedRule = {
  hash: string;
  selector: string;
  css: string;
};
