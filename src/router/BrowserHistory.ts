import { HistoryListener, RouterHistory, RouterLocation } from "./types";

export class BrowserHistory implements RouterHistory {
  listener: HistoryListener | undefined;

  get location() {
    return {
      url: new URL(window.location.href),
      state: window.history.state,
    };
  }

  push(location: RouterLocation): void {
    history.pushState(location.state, "", location.url);
  }

  replace(location: RouterLocation): void {
    history.replaceState(location.state, "", location.url);
  }

  listen(listener: (location: RouterLocation) => void): void {
    if (this.listener) {
      throw new Error("Only 1 listener is allowed");
    }
    this.listener = listener;

    window.addEventListener("popstate", () => {
      this.listener!({
        url: new URL(window.location.href),
        state: window.history.state,
      });
    });
  }
}
