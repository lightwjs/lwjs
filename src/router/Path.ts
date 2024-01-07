export class Path<Params = void> {
  isIndex = false;
  parts: Part[] = [];

  index() {
    this.isIndex = true;
    return this;
  }

  static(part: string) {
    this.parts.push({ type: "static", part });
    return this;
  }

  param(name: string) {
    this.parts.push({ type: "param", name });
    return this;
  }

  toHref(params?: Params) {
    if (this.isIndex) return "/";

    return (
      "/" +
      this.parts
        .map((part) => {
          if (part.type === "static") return part.part;
          else if (part.type === "param") return (params as any)?.[part.name];
        })
        .join("/")
    );
  }
}

type StaticPart = {
  type: "static";
  part: string;
};

type ParamPart = {
  type: "param";
  name: string;
};

type Part = StaticPart | ParamPart;
