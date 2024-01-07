export type RouterLocation = {
  url: URL;
  state?: any;
};

export type HistoryListener = (location: RouterLocation) => void;

export type RouterHistory = {
  readonly location: RouterLocation;
  push(location: RouterLocation): void;
  replace(location: RouterLocation): void;
  listen(listener: HistoryListener): void;
};

export type RouteMatch<Params> = {
  params: Params;
};
