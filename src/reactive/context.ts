import { Computed } from "./Computed";
import { Effect } from "./Effect";
import { ReactiveValue, Sub } from "./types";

class Context {
  currentSub: Sub | null = null;

  trackSubs(reactive: ReactiveValue) {
    if (!this.currentSub) return;
    reactive.subs.add(this.currentSub);
    this.currentSub = null;
  }

  notifySubs(reactive: ReactiveValue) {
    for (const sub of reactive.subs) {
      if (sub instanceof Effect) {
        sub.notify();
      }
    }
    for (const sub of reactive.subs) {
      if (sub instanceof Computed) {
        sub.notify();
      }
    }
  }
}

export const context = new Context();
