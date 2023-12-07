export const isObject = (v: any): v is Record<string, any> => {
  return v != null && typeof v === "object";
};
