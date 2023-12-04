import { context } from "./context";
import { Subs } from "./types";

export class Signal<Value = any> {
  constructor(initialValue: Value) {
    this._value = initialValue;
  }
  _value;
  subs: Subs = new Set();

  get value() {
    context.trackSubs(this);
    return this._value;
  }

  set value(newValue: Value) {
    const prevValue = this._value;
    this._value = newValue;
    if (this._value !== prevValue) {
      context.notifySubs(this);
    }
  }

  toString() {
    return this.value + "";
  }

  toJSON() {
    return this.value;
  }
}

export const signal = <Value>(initialValue: Value) => new Signal(initialValue);
