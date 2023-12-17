import { Computed, Effect, EffectFn, Signal } from "../reactive";
import { LwElement, Renderer } from "../types";
import { isLwObjectOfType } from "../utils";
import { ComponentElement } from "./ComponentElement";
import { Context } from "./Context";

export class ComponentApi<Props> {
  constructor(el: ComponentElement<Props>, renderer: Renderer) {
    this._el = el;
    this._renderer = renderer;
    this.props = el.props;
  }
  _el;
  _renderer;
  props;

  signal<Value>(initialValue: Value) {
    return new Signal(initialValue, this._renderer.ctx);
  }

  computed<Value>(compute: () => Value) {
    return new Computed(compute, this._renderer.ctx);
  }

  effect(fn: EffectFn) {
    const eff = new Effect(fn, this._renderer.ctx, { timing: "afterPaint" });
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
