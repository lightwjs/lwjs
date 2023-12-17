import { ReactiveContext } from "../reactive";

export type CssCache = Record<string, true>;

export interface Renderer {
  ctx: ReactiveContext;
}
