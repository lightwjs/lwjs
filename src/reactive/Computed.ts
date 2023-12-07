import { TYPE_MAP } from "../constants";
import { reactiveContext } from "./ReactiveContext";
import { Subs } from "./types";

export class Computed<Value = any> {
  constructor(compute: () => Value) {
    this.compute = compute;
  }
  type = TYPE_MAP.computed;
  _value!: Value;
  isDirty = true;
  compute;
  subs: Subs | undefined;

  get value() {
    reactiveContext.trackSubs(this);
    if (this.isDirty) {
      reactiveContext.currentSub = this;
      this._value = this.compute();
      reactiveContext.currentSub = null;
      this.isDirty = false;
    }
    return this._value;
  }

  notify() {
    this.isDirty = true;
    reactiveContext.notifySubs(this);
  }

  toString() {
    return this.value + "";
  }

  toJSON() {
    return this.value;
  }
}
