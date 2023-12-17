import { Route } from "./Route";

export const matchRoutes = (path: string, routes: Route[]) => {
  const parts = getPathParts(path);

  for (const route of routes) {
    // check is index path
    if (path === "/") {
      if (route.path.isIndex) {
        return {
          route,
        };
      }
    }

    const partsLength = parts.length;

    // check length of path
    if (partsLength > route.path.segments.length) {
      continue;
    }

    // check segments
    const params: Record<string, any> = {};
    let isMatch = true;

    for (let i = 0; i < partsLength; i++) {
      const p = parts[i];
      const seg = route.path.segments[i];

      if (seg.type === "static" && seg.path !== p) {
        isMatch = false;
        break;
      }
      //
      if (seg.type === "param") {
        const transformedValue = seg.transform ? seg.transform(p) : p;
        let isValid = true;
        if (typeof seg.isMatch === "function") {
          isValid = seg.isMatch(transformedValue);
        }
        if (!isValid) {
          isMatch = false;
          break;
        }
        params[seg.name] = transformedValue;
      }
    }

    if (isMatch) {
      return {
        route,
        params,
      };
    }
  }
};

const getPathParts = (path: string) => {
  let parts = path.split("/").filter(Boolean);

  // remove leading slash
  if (parts[0] === "/") {
    parts = parts.slice(1);
  }

  return parts;
};
