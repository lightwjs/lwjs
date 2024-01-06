import { Path, RouterLocation, To } from "./types";

export const createLocation = (
  current: string | RouterLocation,
  to: To,
  state: any = null,
  key?: string
): Readonly<RouterLocation> => {
  return {
    pathname: typeof current === "string" ? current : current.pathname,
    search: "",
    hash: "",
    ...(typeof to === "string" ? parsePath(to) : to),
    state,
    key: key ?? createKey(),
  };
};

const createKey = () => Math.random().toString(36).substr(2, 8);

const parsePath = (path: string): Partial<Path> => {
  const parsedPath: Partial<Path> = {};

  if (path) {
    const hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substr(hashIndex);
      path = path.substring(0, hashIndex);
    }

    const searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substring(searchIndex + 1);
      path = path.substring(0, searchIndex);
    }

    if (path) {
      parsedPath.pathname = path;
    }
  }

  return parsedPath;
};

export const createPath = ({
  pathname = "/",
  search = "",
  hash = "",
}: Partial<Path>) => {
  if (search && search !== "?")
    pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#")
    pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
};
