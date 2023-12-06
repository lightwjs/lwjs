import { Computed } from "./Computed";
import { Effect } from "./Effect";
import { ReactiveValue, Sub } from "./types";

class ReactiveContext {
  currentSub: Sub | null = null;

  trackSubs(reactive: ReactiveValue) {
    if (!this.currentSub) return;
    if (reactive.subs == null) reactive.subs = new Set();
    reactive.subs.add(this.currentSub);
    if (this.currentSub instanceof Effect) {
      this.currentSub.subs.push(reactive.subs);
    }
  }

  notifySubs(reactive: ReactiveValue) {
    const subs = reactive.subs;
    if (!subs || subs.size === 0) return;

    for (const sub of subs) {
      if (sub instanceof Effect) {
        sub.notify();
      }
    }
    for (const sub of subs) {
      if (sub instanceof Computed) {
        sub.notify();
      }
    }
  }
}

export const reactiveContext = new ReactiveContext();
