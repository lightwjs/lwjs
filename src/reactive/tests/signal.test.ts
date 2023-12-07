import { describe, expect, test } from "vitest";
import { Signal } from "../Signal";

describe("signal", () => {
  test("returns value", () => {
    const s = new Signal(0);
    expect(s.value).equal(0);
  });

  test("toString", () => {
    const s = new Signal(0);
    expect(s.toString()).equal("0");
  });

  test("toJSON", () => {
    const s = new Signal(0);
    expect(s.toJSON()).equal(0);
  });

  test("value is updated", () => {
    const s = new Signal(0);
    s.value = 1;
    expect(s.value).equal(1);
  });
});
