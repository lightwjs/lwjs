import { TYPE_MAP } from "../constants";
import { ReactiveContext } from "./ReactiveContext";
import { Subs } from "./types";

export class Computed<Value = any> {
  constructor(compute: () => Value, ctx: ReactiveContext) {
    this.compute = compute;
    this._ctx = ctx;
  }
  type = TYPE_MAP.computed;
  _value!: Value;
  isDirty = true;
  compute;
  subs: Subs | undefined;
  _ctx;

  get value() {
    this._ctx.trackSubs(this);
    if (this.isDirty) {
      this._ctx.currentSub = this;
      this._value = this.compute();
      this._ctx.currentSub = null;
      this.isDirty = false;
    }
    return this._value;
  }

  notify() {
    this.isDirty = true;
    this._ctx.notifySubs(this);
  }

  toString() {
    return this.value + "";
  }

  toJSON() {
    return this.value;
  }
}
