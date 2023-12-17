import { Path } from "./Path";

/** Sort function for Paths */
export const comparePaths = (a: Path, b: Path) => {
  // index before non-index
  const isIndex = a.isIndex ? -1 : b.isIndex ? 1 : 0;
  if (isIndex !== 0) return isIndex;

  const length = Math.min(a.segments.length, b.segments.length);

  // path with more segments goes before
  if (a.segments.length !== b.segments.length) {
    return a.segments.length > b.segments.length ? -1 : 1;
  }

  // bigger score goes before
  for (let i = 0; i < length; i++) {
    const scoreA = SEGMENTS_SCORE_MAP[a.segments[i].type];
    const scoreB = SEGMENTS_SCORE_MAP[b.segments[i].type];

    if (scoreA !== scoreB) {
      return scoreA > scoreB ? -1 : 1;
    }
  }

  // default: by order of appearance in config
  return a.routeIndex > b.routeIndex ? -1 : 1;
};

const SEGMENTS_SCORE_MAP = {
  wildcard: 1,
  param: 2,
  static: 3,
};
