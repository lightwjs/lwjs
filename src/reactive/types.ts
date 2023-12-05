import { Computed } from "./Computed";
import { Effect } from "./Effect";
import { Signal } from "./Signal";

export type Sub = Computed | Effect;

export type Subs = Set<Sub>;

export type ReactiveValue<Value = any> = Signal<Value> | Computed<Value>;
