import { component, getContext, h } from "../elements";
import { HTMLAnchorElementProps } from "../types";
import { RouterContext } from "./Router";
import { RouterNavigateOptions } from "./types";

export type LinkProps = HTMLAnchorElementProps & {
  path: string;
} & RouterNavigateOptions;

export const Link = component<LinkProps>(
  ({ path, replace, state, children, ...anchorProps }) => {
    const router = getContext(RouterContext);

    return h(
      "a",
      {
        ...anchorProps,
        href: path,
        onClick: (e) => {
          e.preventDefault();
          router.navigate(path, { replace, state });
          anchorProps.onClick?.(e);
        },
      },
      children
    );
  }
);
