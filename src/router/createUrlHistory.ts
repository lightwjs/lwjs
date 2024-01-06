// import {
//   HistoryAction,
//   HistoryListener,
//   HistoryState,
//   RouterHistory,
//   RouterLocation,
//   To,
// } from "./types";
// import { createLocation, createPath } from "./utils";

// export const createUrlHistory = (
//   getLocation: (
//     window: Window,
//     globalHistory: Window["history"]
//   ) => RouterLocation,
//   createHref: (window: Window, to: To) => string,
//   validateLocation: ((location: RouterLocation, to: To) => void) | null
// ): RouterHistory => {
//   const getIndex = (): number => {
//     const state = globalHistory.state ?? { idx: null };
//     return state.idx;
//   };

//   let action: HistoryAction = "pop";
//   const globalHistory = window.history;
//   let listener: HistoryListener | undefined;
//   let index = getIndex();

//   if (index == null) {
//     index = 0;
//     globalHistory.replaceState({ ...globalHistory.state, idx: index }, "");
//   }

//   const onPop = () => {
//     action = "pop";
//     const nextIndex = getIndex();
//     const delta = nextIndex == null ? null : nextIndex - index;
//     index = nextIndex;
//     if (listener) {
//       listener({ action, location: history.location, delta });
//     }
//   };

//   const createUrl = (to: To): URL => {
//     const base =
//       window.location.origin !== "null"
//         ? window.location.origin
//         : window.location.href;
//     const href = typeof to === "string" ? to : createPath(to);
//     return new URL(href, base);
//   };

//   const push = (to: To, state?: any) => {
//     action = "push";
//     const location = createLocation(history.location, to, state);
//     if (validateLocation) validateLocation(location, to);

//     index = getIndex() + 1;
//     const historyState = getHistoryState(location, index);
//     const url = history.createHref(location);

//     // try...catch because iOS limits us to 100 pushState calls :/
//     try {
//       globalHistory.pushState(historyState, "", url);
//     } catch (error) {
//       // If the exception is because `state` can't be serialized, let that throw
//       // outwards just like a replace call would so the dev knows the cause
//       // https://html.spec.whatwg.org/multipage/nav-history-apis.html#shared-history-push/replace-state-steps
//       // https://html.spec.whatwg.org/multipage/structured-data.html#structuredserializeinternal
//       if (error instanceof DOMException && error.name === "DataCloneError") {
//         throw error;
//       }
//       // They are going to lose state here, but there is no real
//       // way to warn them about it since the page will refresh...
//       window.location.assign(url);
//     }
//   };

//   const replace = (to: To, state?: any) => {
//     action = "replace";
//     const location = createLocation(history.location, to, state);
//     if (validateLocation) validateLocation(location, to);

//     index = getIndex();
//     const historyState = getHistoryState(location, index);
//     const url = history.createHref(location);
//     globalHistory.replaceState(historyState, "", url);
//   };

//   const history: RouterHistory = {
//     get action() {
//       return action;
//     },
//     get location() {
//       return getLocation(window, globalHistory);
//     },
//     listen(fn: HistoryListener) {
//       if (listener) {
//         throw new Error("A history only accepts one active listener");
//       }
//       window.addEventListener("popstate", onPop);
//       listener = fn;

//       return () => {
//         window.removeEventListener("popstate", onPop);
//         listener = undefined;
//       };
//     },
//     createHref(to) {
//       return createHref(window, to);
//     },
//     createUrl,
//     encodeLocation(to) {
//       // Encode a Location the same way window.location would
//       const url = createUrl(to);
//       return {
//         pathname: url.pathname,
//         search: url.search,
//         hash: url.hash,
//       };
//     },
//     push,
//     replace,
//     go(n) {
//       return globalHistory.go(n);
//     },
//   };

//   return history;
// };

// const getHistoryState = (
//   location: RouterLocation,
//   index: number
// ): HistoryState => {
//   return {
//     usr: location.state,
//     key: location.key,
//     idx: index,
//   };
// };

export {};
