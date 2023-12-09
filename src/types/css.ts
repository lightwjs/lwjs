import * as CSS from "csstype";

type CSSPropertiesFallback = CSS.PropertiesFallback<number | string>;

type CSSPseudos = { [K in CSS.Pseudos]?: CSSObject };

type CSSObjectBase = {
  [K in keyof CSSPropertiesFallback]: CSSPropertiesFallback[K];
};

interface CSSOthersObject {
  // TODO: Replace any with CSSObject
  [name: string]: any;
}

export interface CSSObject extends CSSObjectBase, CSSPseudos, CSSOthersObject {}
