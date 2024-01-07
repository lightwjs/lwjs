import { Route } from "./Route";
import { RouteMatch } from "./types";

export const matchRoute = (
  url: URL,
  r: Route<any>
): RouteMatch<any> | undefined => {
  if (r.path.isIndex) {
    if (url.pathname === "/") {
      return {
        params: {},
      };
    }
    return undefined;
  }

  const urlParts = url.pathname.split("/").filter(Boolean);

  if (urlParts.length === 0) return undefined;

  const urlPartsLen = urlParts.length;
  const routePartsLen = r.path.parts.length;

  if (routePartsLen > urlPartsLen) return undefined;

  const minLen = Math.min(urlPartsLen, routePartsLen);

  const params: any = {};

  for (let i = 0; i < minLen; i++) {
    const urlPart = urlParts[i];
    const routePart = r.path.parts[i];

    if (routePart.type === "static") {
      if (routePart.part !== urlPart) return undefined;
    }
    //
    else if (routePart.type === "param") {
      params[routePart.name] = urlPart;
    }
  }

  return {
    params,
  };
};
