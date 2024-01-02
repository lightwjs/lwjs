import { TYPE_MAP } from "../constants";
import { Dep, Sub } from "./types";

export class Computed<Value> {
  constructor(deps: Dep[], compute: () => Value) {
    this.deps = deps;
    this.compute = compute;

    deps.forEach((d) => d.subscribe(this));
  }
  type = TYPE_MAP.computed;
  deps;
  compute;
  _value!: Value;
  isDirty = true;
  subs = new Set<Sub>();

  get value() {
    if (this.isDirty) {
      this._value = this.compute();
      this.isDirty = false;
    }
    return this._value;
  }

  subscribe(sub: Sub) {
    this.subs.add(sub);
  }

  notify() {
    this.isDirty = true;
    this.notifySubs();
  }

  notifySubs() {
    for (const sub of this.subs) {
      sub.notify();
    }
  }

  dispose() {
    for (const dep of this.deps) {
      dep.subs.delete(this);
    }
    this.deps.length = 0;
  }
}

export const computed = <Value>(deps: Dep[], compute: () => Value) => {
  return new Computed<Value>(deps, compute);
};
