import { describe, expect, test } from "vitest";
import { HtmlElement } from "../../elements";
import { Computed, Signal } from "../../reactive";
import { isLwObjectOfType } from "../isLwObjectOfType";

describe("lw object type checks", () => {
  test("signal", () => {
    const s = new Signal(0);
    expect(isLwObjectOfType(s, "signal")).equal(true);
  });

  test("computed", () => {
    const c = new Computed(() => {});
    expect(isLwObjectOfType(c, "computed")).equal(true);
  });

  test("html", () => {
    const el = new HtmlElement("div", {}, []);
    expect(isLwObjectOfType(el, "html")).equal(true);
  });
});
