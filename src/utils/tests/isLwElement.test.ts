import { describe, expect, test } from "vitest";
import { Signal } from "../../reactive";
import { isLwElement } from "../isLwElement";

describe("isLwElement", () => {
  test("primitive", () => {
    expect(isLwElement(0)).equal(false);
  });

  test("plain object", () => {
    expect(isLwElement({})).equal(false);
  });

  test("reactive value", () => {
    expect(isLwElement(new Signal(0))).equal(false);
  });
});
