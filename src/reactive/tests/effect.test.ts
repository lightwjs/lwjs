import { describe, expect, test, vi } from "vitest";
import { Effect } from "../Effect";
import { ReactiveContext } from "../ReactiveContext";
import { Signal } from "../Signal";

const ctx = new ReactiveContext();

describe("effect", () => {
  test("runs once on creation", () => {
    const spy = vi.fn(() => {});
    new Effect(spy, ctx);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test("run called when single dep change", () => {
    const s = new Signal(0, ctx);
    const spy = vi.fn(() => s.value);
    new Effect(spy, ctx);
    expect(spy).toBeCalledTimes(1);
    spy.mockReset();

    s.value = 1;

    expect(spy).toBeCalledTimes(1);
  });

  test("run called when multiple deps change", () => {
    const s1 = new Signal(0, ctx);
    const s2 = new Signal(0, ctx);
    const spy = vi.fn(() => {
      s1.value;
      s2.value;
    });
    new Effect(spy, ctx);
    expect(spy).toBeCalledTimes(1);
    spy.mockReset();

    s1.value = 1;
    s2.value = 1;

    expect(spy).toBeCalledTimes(2);
  });

  test("mutiple effects called when deps change", () => {
    const s = new Signal(0, ctx);
    const spy1 = vi.fn(() => {
      s.value;
    });
    const spy2 = vi.fn(() => {
      s.value;
    });
    new Effect(spy1, ctx);
    new Effect(spy2, ctx);
    expect(spy1).toBeCalledTimes(1);
    expect(spy2).toBeCalledTimes(1);
    spy1.mockReset();
    spy2.mockReset();

    s.value = 1;

    expect(spy1).toBeCalledTimes(1);
    expect(spy2).toBeCalledTimes(1);
  });
});
