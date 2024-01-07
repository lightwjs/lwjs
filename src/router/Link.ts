import { component, h } from "../elements";
import { HTMLAnchorElementProps } from "../types";
import { getRouterContext } from "./Router";

export type LinkProps = {
  path: string;
} & HTMLAnchorElementProps;

export const Link = component<LinkProps>(({ path, children, ...props }) => {
  const router = getRouterContext();

  return h(
    "a",
    {
      ...props,
      href: path,
      onClick: (e) => {
        e.preventDefault();
        router.navigate(path);
      },
    },
    children
  );
});
