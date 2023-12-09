import { describe, expect, test } from "vitest";
import { Computed } from "../Computed";
import { ReactiveContext } from "../ReactiveContext";
import { Signal } from "../Signal";

const ctx = new ReactiveContext();

describe("computed", () => {
  test("computes value", () => {
    const s = new Signal(1, ctx);
    const c = new Computed(() => s.value * 2, ctx);
    expect(c.value).equal(2);
  });

  test("toString", () => {
    const s = new Signal(1, ctx);
    const c = new Computed(() => s.value * 2, ctx);
    expect(c.toString()).equal("2");
  });

  test("toJSON", () => {
    const s = new Signal(1, ctx);
    const c = new Computed(() => s.value * 2, ctx);
    expect(c.toJSON()).equal(2);
  });

  test("is notified and computes value", () => {
    const s = new Signal(1, ctx);
    const c = new Computed(() => s.value * 2, ctx);
    expect(c.value).equal(2);

    s.value = 2;

    expect(c.value).equal(4);
  });

  test("computed depends on computed", () => {
    const s = new Signal(1, ctx);
    const c = new Computed(() => s.value * 2, ctx);
    const c2 = new Computed(() => c.value * 2, ctx);
    expect(c.value).equal(2);
    expect(c2.value).equal(4);

    s.value = 2;

    expect(c.value).equal(4);
    expect(c2.value).equal(8);
  });
});
