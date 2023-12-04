import { Computed } from "./computed";
import { Effect } from "./effect";
import { ReactiveValue, Sub } from "./types";

class Context {
  currentSub: Sub | null = null;

  trackSubs(reactive: ReactiveValue) {
    if (!this.currentSub) return;
    reactive.subs.add(this.currentSub);
  }

  notifySubs(reactive: ReactiveValue) {
    for (const sub of reactive.subs) {
      if (sub instanceof Computed) {
        sub.notify();
      }
    }
    for (const sub of reactive.subs) {
      if (sub instanceof Effect) {
        sub.notify();
      }
    }
  }
}

export const context = new Context();
