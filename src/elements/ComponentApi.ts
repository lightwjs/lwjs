import { TYPE_MAP } from "../constants";
import { Effect, EffectFn, Signal } from "../reactive";
import { LwElement } from "../types";
import { ComponentElement } from "./ComponentElement";
import { Context } from "./Context";

export class ComponentApi<Props> {
  constructor(el: ComponentElement<Props>) {
    this._el = el;
  }
  _el;

  get props() {
    return this._el.props;
  }

  signal<Value>(initialValue: Value) {
    return new Signal(initialValue);
  }

  effect(fn: EffectFn) {
    new Effect(fn, { timing: "afterPaint" });
  }

  getContext<Value>(context: Context<Value>) {
    let current: LwElement | undefined = this._el;

    while (current) {
      if (current.type === TYPE_MAP.provider && current.ctx === context) {
        return current.value as Value;
      }
      current = current.parent;

      if (!current) return undefined as Value;
    }

    return undefined as Value;
  }
}
