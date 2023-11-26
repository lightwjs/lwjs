import { createSheet } from "./sheet";

export const createCss = () => {
  const sheet = createSheet({ container: document.head });

  const css = (cssObject: any) => {
    let s = "";

    const keys = Object.keys(cssObject);

    for (const key of keys) {
      let k = key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
      let v = cssObject[key];

      if (typeof v === "number") {
        v = `${v}px`;
      }
      s += `${k}:${v};`;
    }

    // return className;
  };

  return {
    css,
  };
};
