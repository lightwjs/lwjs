import { Computed, Effect, EffectFn, Signal } from "../reactive";
import { LwElement } from "../types";
import { isLwObjectOfType } from "../utils";
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

  computed<Value>(compute: () => Value) {
    return new Computed(compute);
  }

  effect(fn: EffectFn) {
    const eff = new Effect(fn, { timing: "afterPaint" });
    this._el.effects.push(eff);
  }

  getContext<Value>(context: Context<Value>) {
    let current: LwElement | undefined = this._el;

    while (current) {
      if (isLwObjectOfType(current, "provider") && current.ctx === context) {
        return current.value as Value;
      }
      current = current.parent;

      if (!current) return undefined as Value;
    }

    return undefined as Value;
  }
}
