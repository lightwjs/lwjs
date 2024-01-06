export const getPathParts = (path: string) => {
  let parts = path.split("/").filter(Boolean);
  // remove leading slash
  if (parts[0] === "/") {
    parts = parts.slice(1);
  }
  return parts;
};
