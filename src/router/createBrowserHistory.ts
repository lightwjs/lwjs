// import { createUrlHistory } from "./createUrlHistory";
// import { To } from "./types";
// import { createLocation, createPath } from "./utils";

// export const createBrowserHistory = () => {
//   const createBrowserLocation = (
//     window: Window,
//     globalHistory: Window["history"]
//   ) => {
//     const { pathname, search, hash } = window.location;
//     return createLocation(
//       "",
//       { pathname, search, hash },
//       // state defaults to `null` because `window.history.state` does
//       (globalHistory.state && globalHistory.state.usr) || null,
//       (globalHistory.state && globalHistory.state.key) || "default"
//     );
//   };

//   const createBrowserHref = (_: Window, to: To) => {
//     return typeof to === "string" ? to : createPath(to);
//   };

//   return createUrlHistory(createBrowserLocation, createBrowserHref, null);
// };

export {};
