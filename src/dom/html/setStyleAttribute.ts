export const setStyleAttribute = (
  node: HTMLElement | SVGElement,
  styleObj: Record<string, any>
) => {
  for (const key of Object.keys(styleObj)) {
    let v = styleObj[key];

    if (typeof v === "number") {
      v = `${v}px`;
    }
    // @ts-expect-error I don't know 🤷‍♂️
    node.style[key] = v;
  }
};
