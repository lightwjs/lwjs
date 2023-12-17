import { Router } from "./Router";
import { RouterHistory, RouterLocation } from "./types";

export class BrowserHistory implements RouterHistory {
  constructor(router: Router) {
    window.addEventListener("popstate", (e) => {
      router.location.value = {
        url: new URL(this.getCurrentUrl()),
        state: e.state,
      };
    });
  }

  getCurrentUrl() {
    return window.location.href;
  }

  push(location: RouterLocation) {
    window.history.pushState(location.state, "", location.url);
  }

  replace(location: RouterLocation) {
    window.history.pushState(location.state, "", location.url);
  }
}
