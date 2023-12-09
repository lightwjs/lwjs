import { TYPE_MAP } from "../constants";
import { ReactiveContext } from "./ReactiveContext";
import { Subs } from "./types";

export class Signal<Value = any> {
  constructor(initialValue: Value, ctx: ReactiveContext) {
    this._value = initialValue;
    this._ctx = ctx;
  }
  type = TYPE_MAP.signal;
  _value;
  subs: Subs | undefined;
  _ctx;

  get value() {
    this._ctx.trackSubs(this);
    return this._value;
  }

  set value(newValue: Value) {
    const prevValue = this._value;
    this._value = newValue;
    if (this._value !== prevValue) {
      this._ctx.notifySubs(this);
    }
  }

  toString() {
    return this.value + "";
  }

  toJSON() {
    return this.value;
  }
}
