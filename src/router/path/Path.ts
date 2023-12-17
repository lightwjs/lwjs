import { ParamSegmentOptions, Segment } from "../types";

export class Path<Params = void> {
  constructor(segments: Segment[] = []) {
    this.segments = segments;
  }

  isIndex = false;
  hasWildcard = false;
  routeIndex = 0;
  segments;

  index() {
    throwIfIndex(this);
    throwIfWildcard(this);
    throwIfSegments(this);
    this.isIndex = true;
    return this;
  }

  static(path: string) {
    throwIfIndex(this);
    throwIfWildcard(this);
    this.segments.push({ type: "static", path });
    return this;
  }

  param<Name extends Extract<keyof Params, string>>(
    name: Name,
    options?: ParamSegmentOptions<Params[Name]>
  ) {
    throwIfIndex(this);
    throwIfWildcard(this);
    this.segments.push({
      type: "param",
      name,
      transform: options?.transform,
      isMatch: options?.isMatch,
    });
    return this;
  }

  wildcard() {
    throwIfIndex(this);
    throwIfWildcard(this);
    this.segments.push({
      type: "wildcard",
    });
    this.hasWildcard = true;
    return this;
  }

  toString() {
    if (this.isIndex) return "/";
    return this.segments
      .map((s) => {
        if (s.type === "static") return s.path;
        if (s.type === "param") return `:${s.name}`;
        return "*";
      })
      .join("/");
  }

  toHref(params?: Params) {
    if (this.isIndex) return "/";

    return this.segments
      .map((s) => {
        if (s.type === "static") {
          return s.path;
        }
        //
        if (s.type === "param") {
          return (params as any)[s.name];
        }
      })
      .join("/");
  }
}

const throwIfIndex = (p: Path<any>) => {
  if (p.isIndex) throw new Error(`Cannot extend index path`);
};

const throwIfWildcard = (p: Path<any>) => {
  if (p.hasWildcard) throw new Error(`Cannot extend wildcard path`);
};

const throwIfSegments = (p: Path<any>) => {
  if (p.segments.length > 0)
    throw new Error("Path cannot be index, it already has segments");
};

export const path = <Params = void>() => new Path<Params>();
