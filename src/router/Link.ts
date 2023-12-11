import { component, h } from "../elements";

export type LinkProps = {
  path: string;
};

export const Link = component<LinkProps>(($) => {
  return h(
    "a",
    {
      href: $.props.path,
      onClick: (e) => {
        e.preventDefault();
      },
    },
    $.props.children
  );
});
