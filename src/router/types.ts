export type RouterNavigateOptions<State = any> = {
  state?: State;
  replace?: boolean;
};

export type StaticSegment = {
  type: "static";
  path: string;
};

export type ParamSegment = {
  type: "param";
  name: string;
  transform?: (value: string) => any;
  isMatch?: (value: any) => boolean;
};

export type ParamSegmentOptions<Value> = {
  transform?: (value: string) => Value;
  isMatch?: (value: Value) => boolean;
};

export type WildcardSegment = {
  type: "wildcard";
};

export type Segment = StaticSegment | ParamSegment | WildcardSegment;

export type RouterLocation = {
  url: URL;
  state: any;
};

export interface RouterHistory {
  getCurrentUrl: () => string;
  push: (location: RouterLocation) => void;
  replace: (location: RouterLocation) => void;
}

export type RouteMatch = {
  params: Record<string, any>;
};
