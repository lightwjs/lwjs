import { TYPE_MAP } from "../constants";
import { reactiveContext } from "./ReactiveContext";
import { Subs } from "./types";

export class Effect {
  constructor(fn: EffectFn, options?: EffectOptions) {
    this.fn = fn;
    this.timing = options?.timing ?? "sync";

    this.scheduledRun();
  }
  type = TYPE_MAP.effect;
  fn;
  cleanup: EffectCleanupFn | undefined;
  subs: Subs[] = [];
  timing;

  run() {
    if (this.cleanup) this.cleanup();
    reactiveContext.currentSub = this;
    this.cleanup = this.fn();
    reactiveContext.currentSub = null;
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
    if (this.cleanup) this.cleanup();
    for (const subs of this.subs) {
      subs.delete(this);
    }
    this.subs.length = 0;
  }
}

export const syncEffect = (callback: () => any) => {
  return new Effect(callback);
};

export type EffectOptions = {
  timing?: "sync" | "afterPaint";
};

export type EffectFn = () => any | EffectCleanupFn;

type EffectCleanupFn = () => any;
