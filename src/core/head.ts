import { createHeadElement } from "./createElements";
import { Signal } from "./reactive";
import { LwReactiveProps } from "./types";

type MetaProps = LwReactiveProps<{
  name?: string;
  content?: string;
  charSet?: string;
  httpEquiv?: string;
}>;

export const head = {
  title: (text: string | Signal<string>) => {
    return createHeadElement("title", { text });
  },
  meta: (props: MetaProps) => {
    return createHeadElement("meta", props);
  },
};
