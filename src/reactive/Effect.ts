import { activeComponent } from "../activeComponent";
import { TYPE_MAP } from "../constants";
import { Dep, EffectCleanupFn, EffectFn, EffectOptions } from "./types";

export class Effect {
  constructor(deps: Dep[], fn: EffectFn, options?: EffectOptions) {
    this.deps = deps;
    this.fn = fn;
    this.timing = options?.timing ?? "sync";

    deps.forEach((d) => d.subscribe(this));

    this.scheduledRun();
  }
  type = TYPE_MAP.effect;
  deps;
  fn;
  cleanup: EffectCleanupFn | undefined;
  timing;

  run() {
    if (this.cleanup) this.cleanup();
    this.cleanup = this.fn();
  }

  scheduledRun() {
    if (this.timing === "afterPaint") {
      requestAnimationFrame(() => this.run());
    }
    //
    else {
      this.run();
    }
  }

  notify() {
    this.scheduledRun();
  }

  dispose() {
    this.cleanup?.();
    for (const dep of this.deps) {
      dep.subs.delete(this);
    }
    this.deps.length = 0;
  }
}

export const effect = (deps: Dep[], fn: EffectFn, options?: EffectOptions) => {
  const el = activeComponent.get();
  const eff = new Effect(deps, fn, { timing: "afterPaint", ...options });

  if (el) el.effects.push(eff);
};
