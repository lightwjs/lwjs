import { describe, expect, test, vi } from "vitest";
import { Effect, effect } from "../effect";
import { signal } from "../signal";

describe("effect", () => {
  test("creation", () => {
    const e = effect(() => {});
    expect(e).toBeInstanceOf(Effect);
    expect(e.run).toBeTypeOf("function");
  });

  test("runs once on creation", () => {
    const spy = vi.fn(() => {});
    effect(spy);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test("run called when single dep change", () => {
    const s = signal(0);
    const spy = vi.fn(() => s.value);
    effect(spy);
    expect(spy).toBeCalledTimes(1);
    spy.mockReset();

    s.value = 1;

    expect(spy).toBeCalledTimes(1);
  });

  test("run called when multiple deps change", () => {
    const s1 = signal(0);
    const s2 = signal(0);
    const spy = vi.fn(() => {
      s1.value;
      s2.value;
    });
    effect(spy);
    expect(spy).toBeCalledTimes(1);
    spy.mockReset();

    s1.value = 1;
    s2.value = 2;

    expect(spy).toBeCalledTimes(2);
  });

  test("mutiple effects called when deps change", () => {
    const s = signal(0);
    const spy1 = vi.fn(() => {
      s.value;
    });
    const spy2 = vi.fn(() => {
      s.value;
    });
    effect(spy1);
    effect(spy2);
    expect(spy1).toBeCalledTimes(1);
    expect(spy2).toBeCalledTimes(1);
    spy1.mockReset();
    spy2.mockReset();

    s.value = 1;

    expect(spy1).toBeCalledTimes(1);
    expect(spy2).toBeCalledTimes(1);
  });
});
