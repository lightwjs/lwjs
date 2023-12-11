import { LwNode } from "../types";
import { SsrRenderer } from "./SsrRenderer";

export const ssr = (node: LwNode) => {
  return new SsrRenderer().render(node);
};

type SsrOptions = {};
