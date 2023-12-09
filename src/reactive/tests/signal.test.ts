import { describe, expect, test } from "vitest";
import { ReactiveContext } from "../ReactiveContext";
import { Signal } from "../Signal";

const ctx = new ReactiveContext();

describe("signal", () => {
  test("returns value", () => {
    const s = new Signal(0, ctx);
    expect(s.value).equal(0);
  });

  test("toString", () => {
    const s = new Signal(0, ctx);
    expect(s.toString()).equal("0");
  });

  test("toJSON", () => {
    const s = new Signal(0, ctx);
    expect(s.toJSON()).equal(0);
  });

  test("value is updated", () => {
    const s = new Signal(0, ctx);
    s.value = 1;
    expect(s.value).equal(1);
  });
});
