import { describe, expect, test } from "vitest";
import { path } from "../PathConfig";

describe("path", () => {
  test("index path", () => {
    const p = path().index();
    expect(p.isIndex).equal(true);
  });

  test("index path cannot be extended", () => {
    const p = path().index();
    expect(() => p.static("users")).toThrowError();
  });

  test("wildcard path cannot be extended", () => {
    const p = path().wildcard();
    expect(() => p.param("id")).toThrowError();
  });

  test("segments", () => {
    const p = path().static("users").param("userId");

    const s1 = p.segments[0];

    expect(JSON.stringify(s1)).equal(
      JSON.stringify({ type: "static", path: "users" })
    );

    const s2 = p.segments[1];

    expect(JSON.stringify(s2)).equal(
      JSON.stringify({ type: "param", name: "userId" })
    );
  });

  test("toString", () => {
    const p = path().static("users").param("userId");
    expect(String(p)).equal("users/:userId");

    const p2 = path().index();
    expect(String(p2)).equal("/");

    const p3 = path().static("users").wildcard();
    expect(String(p3)).equal("users/*");
  });
});
