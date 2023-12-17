import { describe, expect, test } from "vitest";
import { h } from "../../elements";
import { ssr } from "../ssr";

describe("ssr", () => {
  test("empty", () => {
    const html = ssr(h("div"));

    // expect(html).equal("<div/>");
  });
});
