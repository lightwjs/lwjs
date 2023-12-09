import { TYPE_MAP } from "../constants";
import { ReactiveContext } from "./ReactiveContext";
import { Subs } from "./types";

export class Effect {
  constructor(fn: EffectFn, ctx: ReactiveContext, options?: EffectOptions) {
    this.fn = fn;
    this.ctx = ctx;
    this.timing = options?.timing ?? "sync";

    this.scheduledRun();
  }
  type = TYPE_MAP.effect;
  fn;
  cleanup: EffectCleanupFn | undefined;
  subs: Subs[] = [];
  timing;
  ctx;

  run() {
    if (this.cleanup) this.cleanup();
    this.ctx.currentSub = this;
    this.cleanup = this.fn();
    this.ctx.currentSub = null;
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

export type EffectOptions = {
  timing?: "sync" | "afterPaint";
};

export type EffectFn = () => any | EffectCleanupFn;

type EffectCleanupFn = () => any;
