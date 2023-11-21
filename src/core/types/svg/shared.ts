import { MintReactiveProps } from "../shared";
import { AriaAttributes } from "../aria";
import { MintDomProps } from "../shared";
import { SVGAttributes } from "./SvgAttributes";

export type SVGProps<T extends SVGElement> = MintDomProps<T> &
  MintReactiveProps<SVGAttributes & AriaAttributes>;
