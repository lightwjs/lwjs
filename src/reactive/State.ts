import { TYPE_MAP } from "../constants";
import { Sub } from "./types";

export class State<Value> {
  constructor(initialValue: Value) {
    this._value = initialValue;
  }
  type = TYPE_MAP.state;
  _value;
  subs = new Set<Sub>();

  get value() {
    return this._value;
  }

  set value(newValue: Value) {
    const prevValue = this._value;
    this._value = newValue;
    if (this._value !== prevValue) {
      this.notifySubs();
    }
  }

  subscribe(sub: Sub) {
    this.subs.add(sub);
  }

  notifySubs() {
    for (const sub of this.subs) {
      sub.notify();
    }
  }
}

export const state = <Value>(initialValue: Value) => new State(initialValue);
