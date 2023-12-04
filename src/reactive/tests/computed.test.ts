import { describe, expect, test } from "vitest";
import { Computed, computed } from "../computed";
import { signal } from "../signal";

describe("computed", () => {
  test("inherits from Computed", () => {
    const c = computed(() => {});
    expect(c).toBeInstanceOf(Computed);
  });

  test("computes value", () => {
    const s = signal(1);
    const c = computed(() => s.value * 2);
    expect(c.value).equal(2);
  });

  test("toString", () => {
    const s = signal(1);
    const c = computed(() => s.value * 2);
    expect(c.toString()).equal("2");
  });

  test("toJSON", () => {
    const s = signal(1);
    const c = computed(() => s.value * 2);
    expect(c.toJSON()).equal(2);
  });

  test("is notified and computes value", () => {
    const s = signal(1);
    const c = computed(() => s.value * 2);
    expect(c.value).equal(2);

    s.value = 2;

    expect(c.value).equal(4);
  });

  test("computed depends on computed", () => {
    const s = signal(1);
    const c = computed(() => s.value * 2);
    const c2 = computed(() => c.value * 2);
    expect(c.value).equal(2);
    expect(c2.value).equal(4);

    s.value = 2;

    expect(c.value).equal(4);
    expect(c2.value).equal(8);
  });
});
