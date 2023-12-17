import { Route } from "./Route";

/** Sort function for Routes */
export const compareRoutes = (a: Route, b: Route) => {
  const aPath = a.path;
  const bPath = b.path;

  // index before non-index
  const isIndex = aPath.isIndex ? -1 : bPath.isIndex ? 1 : 0;
  if (isIndex !== 0) return isIndex;

  const length = Math.min(aPath.segments.length, bPath.segments.length);

  // path with more segments goes before
  if (aPath.segments.length !== aPath.segments.length) {
    return aPath.segments.length > bPath.segments.length ? -1 : 1;
  }

  // bigger score goes before
  for (let i = 0; i < length; i++) {
    const scoreA = SEGMENTS_SCORE_MAP[aPath.segments[i].type];
    const scoreB = SEGMENTS_SCORE_MAP[bPath.segments[i].type];

    if (scoreA !== scoreB) {
      return scoreA > scoreB ? -1 : 1;
    }
  }

  // default: by order of appearance in config
  return a.originalIndex > b.originalIndex ? -1 : 1;
};

const SEGMENTS_SCORE_MAP = {
  wildcard: 1,
  param: 2,
  static: 3,
};
