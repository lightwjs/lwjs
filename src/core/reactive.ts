import {
  ReadonlySignal as PreactReadonlySignal,
  Signal as PreactSignal,
  computed as preactComputed,
  effect as preactEffect,
  signal as preactSignal,
} from "@preact/signals-core";
import { currentCmp } from "./currentComponent";
import { CmpEffect } from "./types";

export const signal = <T>(value: T) => {
  return preactSignal(value);
};

export const computed = <T>(compute: () => T) => {
  return preactComputed(compute);
};

type EffectParam = () => void | (() => void);

export const effect = (compute: EffectParam) => {
  const cmp = currentCmp.get();

  if (!cmp) {
    throw new Error("effect must be called in a component");
  }

  const eff: CmpEffect = {};

  eff.cleanup = preactEffect(() => {
    setTimeout(() => {
      const usrCleanup = compute();
      if (usrCleanup) eff.usrCleanup = usrCleanup;
    });
  });

  cmp.effects.push(eff);
};

export const instantEffect: typeof preactEffect = (compute) => {
  return preactEffect(compute);
};

export class Signal<T = any> extends PreactSignal<T> {}

export type ReadonlySignal<T = any> = PreactReadonlySignal<T>;
