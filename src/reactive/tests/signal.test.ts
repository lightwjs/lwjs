import { describe, expect, test } from "vitest";
import { Signal, signal } from "../Signal";

describe("signal", () => {
  test("inherits from Signal", () => {
    const s = signal(0);
    expect(s).toBeInstanceOf(Signal);
  });

  test("returns value", () => {
    const s = signal(0);
    expect(s.value).equal(0);
  });

  test("toString", () => {
    const s = signal(0);
    expect(s.toString()).equal("0");
  });

  test("toJSON", () => {
    const s = signal(0);
    expect(s.toJSON()).equal(0);
  });
});
