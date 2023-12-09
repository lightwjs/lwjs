import { isLwObjectOfType } from "../utils";
import { ReactiveValue, Sub } from "./types";

export class ReactiveContext {
  currentSub: Sub | null = null;

  trackSubs(reactive: ReactiveValue) {
    if (!this.currentSub) return;
    if (reactive.subs == null) reactive.subs = new Set();
    reactive.subs.add(this.currentSub);
    if (isLwObjectOfType(this.currentSub, "effect")) {
      this.currentSub.subs.push(reactive.subs);
    }
  }

  notifySubs(reactive: ReactiveValue) {
    const subs = reactive.subs;
    if (!subs || subs.size === 0) return;

    for (const sub of subs) {
      if (isLwObjectOfType(sub, "effect")) {
        sub.notify();
      }
    }
    for (const sub of subs) {
      if (isLwObjectOfType(sub, "computed")) {
        sub.notify();
      }
    }
  }
}
