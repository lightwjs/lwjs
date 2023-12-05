import { context } from "./context";

export class Effect {
  constructor(fn: EffectFn, options?: EffectOptions) {
    this.fn = fn;
    const timing = options?.timing ?? "sync";

    const run = () => {
      context.currentSub = this;
      this.cleanup = this.fn();
      context.currentSub = null;
    };

    let timedRun;

    if (timing === "afterPaint") {
      timedRun = () => requestAnimationFrame(run);
    } else {
      timedRun = run;
    }

    this.notify = timedRun;

    timedRun();
  }
  fn;
  notify;
  cleanup: EffectCleanupFn | undefined;
}

export const syncEffect = (callback: () => any) => {
  return new Effect(callback);
};

export type EffectOptions = {
  timing?: "sync" | "afterPaint";
};

export type EffectFn = () => any | EffectCleanupFn;

type EffectCleanupFn = () => any;
