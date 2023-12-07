import { TYPE_MAP } from "../constants";
import { reactiveContext } from "./ReactiveContext";
import { Subs } from "./types";

export class Signal<Value = any> {
  constructor(initialValue: Value) {
    this._value = initialValue;
  }
  type = TYPE_MAP.signal;
  _value;
  subs: Subs | undefined;

  get value() {
    reactiveContext.trackSubs(this);
    return this._value;
  }

  set value(newValue: Value) {
    const prevValue = this._value;
    this._value = newValue;
    if (this._value !== prevValue) {
      reactiveContext.notifySubs(this);
    }
  }

  toString() {
    return this.value + "";
  }

  toJSON() {
    return this.value;
  }
}
