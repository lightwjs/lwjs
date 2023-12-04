import { context } from "./context";
import { Subs } from "./types";

export class Computed<Value = any> {
  constructor(compute: () => Value) {
    this.compute = compute;
  }
  _value!: Value;
  isDirty = true;
  compute;
  subs: Subs = new Set();

  get value() {
    context.trackSubs(this);
    if (this.isDirty) {
      context.currentSub = this;
      this._value = this.compute();
      context.currentSub = null;
      this.isDirty = false;
    }
    return this._value;
  }

  notify() {
    this.isDirty = true;
    context.notifySubs(this);
  }

  toString() {
    return this.value + "";
  }

  toJSON() {
    return this.value;
  }
}

export const computed = <Value>(compute: () => Value) => {
  return new Computed(compute);
};
