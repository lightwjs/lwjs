import { component, h } from "../elements";
import { HTMLAnchorElementProps } from "../types";
import { RouterContext } from "./Router";
import { RouterNavigateOptions } from "./types";

export type LinkProps = HTMLAnchorElementProps & {
  path: string;
} & RouterNavigateOptions;

export const Link = component<LinkProps>(($) => {
  const router = $.getContext(RouterContext);

  const { path, replace, state, ...anchorProps } = $.props;

  return h(
    "a",
    {
      ...anchorProps,
      href: $.props.path,
      onClick: (e) => {
        e.preventDefault();
        router.navigate(path, { replace, state });
      },
    },
    $.props.children
  );
});
