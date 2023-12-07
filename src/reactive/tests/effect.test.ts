import { describe, expect, test, vi } from "vitest";
import { Effect, syncEffect } from "../Effect";
import { Signal } from "../Signal";

describe("effect", () => {
  test("creation", () => {
    const e = syncEffect(() => {});
    expect(e).toBeInstanceOf(Effect);
  });

  test("runs once on creation", () => {
    const spy = vi.fn(() => {});
    syncEffect(spy);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test("run called when single dep change", () => {
    const s = new Signal(0);
    const spy = vi.fn(() => s.value);
    syncEffect(spy);
    expect(spy).toBeCalledTimes(1);
    spy.mockReset();

    s.value = 1;

    expect(spy).toBeCalledTimes(1);
  });

  test("run called when multiple deps change", () => {
    const s1 = new Signal(0);
    const s2 = new Signal(0);
    const spy = vi.fn(() => {
      s1.value;
      s2.value;
    });
    syncEffect(spy);
    expect(spy).toBeCalledTimes(1);
    spy.mockReset();

    s1.value = 1;
    s2.value = 1;

    expect(spy).toBeCalledTimes(2);
  });

  test("mutiple effects called when deps change", () => {
    const s = new Signal(0);
    const spy1 = vi.fn(() => {
      s.value;
    });
    const spy2 = vi.fn(() => {
      s.value;
    });
    syncEffect(spy1);
    syncEffect(spy2);
    expect(spy1).toBeCalledTimes(1);
    expect(spy2).toBeCalledTimes(1);
    spy1.mockReset();
    spy2.mockReset();

    s.value = 1;

    expect(spy1).toBeCalledTimes(1);
    expect(spy2).toBeCalledTimes(1);
  });
});
