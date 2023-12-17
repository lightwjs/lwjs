import { RouterHistory } from "./types";

export const createBrowserHistory = (): RouterHistory => {
  return {
    getCurrentUrl: () => window.location.href,
    push: (location) =>
      window.history.pushState(location.state, "", location.url),
    replace: (location) =>
      window.history.replaceState(location.state, "", location.url),
  };
};
