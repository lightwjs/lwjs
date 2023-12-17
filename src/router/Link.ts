import { component, h } from "../elements";
import { RouterContext } from "./Router";
import { RouterNavigateOptions } from "./types";

export type LinkProps = {
  path: string;
} & RouterNavigateOptions;

export const Link = component<LinkProps>(($) => {
  const router = $.getContext(RouterContext);

  const { path, replace, state } = $.props;

  return h(
    "a",
    {
      href: $.props.path,
      onClick: (e) => {
        e.preventDefault();
        router.navigate(path, { replace, state });
      },
    },
    $.props.children
  );
});
