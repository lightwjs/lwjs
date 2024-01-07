import { createCss } from "./createCss";

export const css = (() => {
  let _css: ReturnType<typeof createCss>;

  return {
    get() {
      if (!_css) {
        _css = createCss();
      }
      return _css;
    },
  };
})();
