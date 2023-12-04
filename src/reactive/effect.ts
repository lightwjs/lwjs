import { context } from "./context";

export class Effect {
  constructor(callback: () => any) {
    this.callback = callback;
  }
  callback;

  run() {
    context.currentSub = this;
    this.callback();
  }

  notify() {
    this.run();
  }
}

export const effect = (callback: () => any) => {
  const e = new Effect(callback);

  e.run();

  return e;
};
