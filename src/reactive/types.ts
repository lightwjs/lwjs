import { Computed } from "./computed";
import { Effect } from "./effect";
import { Signal } from "./signal";

export type Sub = Computed | Effect;

export type Subs = Set<Sub>;

export type ReactiveValue = Signal | Computed;
