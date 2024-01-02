import { Computed } from "./Computed";
import { Effect } from "./Effect";
import { State } from "./State";

export type Sub = Computed<any> | Effect;

export type Subs = Set<Sub>;

export type ReactiveValue<Value = any> = State<Value> | Computed<Value>;

export type EffectOptions = {
  timing?: "sync" | "afterPaint";
};

export type EffectFn = () => any | EffectCleanupFn;

export type EffectCleanupFn = () => any;

export type Dep = State<any> | Computed<any>;
