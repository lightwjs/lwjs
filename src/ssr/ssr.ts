import { createElements } from "../elements";
import { LwNode } from "../types";
import { createString } from "./createString";

export const ssr = (node: LwNode) => {
  const els = createElements(node);
  const bodyHtml = createString(els);

  return `<head></head><body>${bodyHtml}</body>`;
};
