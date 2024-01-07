/**
 * @vitest-environment jsdom
 */

import { describe, expect, test, vi } from "vitest";
import { h } from "../../elements";
import { createHtmlElementDom, setStyleAttribute } from "../html";

describe("dom html", () => {
  test("empty element", () => {
    const el = h("div", {});
    const [node] = createHtmlElementDom(el);

    expect(node).toBeInstanceOf(HTMLElement);
    expect(node.tagName).equal("DIV");
  });

  test("with child", () => {
    const el = h("div", {}, h("h1", {}));
    const [node] = createHtmlElementDom(el);

    expect(node).toBeInstanceOf(HTMLElement);
    expect(node.tagName).equal("DIV");

    const child = node.childNodes[0] as HTMLHeadingElement;

    expect(child).toBeInstanceOf(HTMLHeadingElement);
    expect(child.tagName).toBe("H1");
  });

  test("with attributes", () => {
    const id = "test";
    const className = "class";

    const el = h("div", {
      id,
      className,
    });
    const [node] = createHtmlElementDom(el);

    expect(node).toBeInstanceOf(HTMLElement);
    expect(node.tagName).equal("DIV");
    expect(node.id).equal(id);
    expect(node.className).equal(className);
  });

  test("with event handler", () => {
    const onClick = vi.fn(() => {});
    const el = h("div", {
      onClick,
    });
    const [node] = createHtmlElementDom(el);

    expect(onClick).toBeCalledTimes(0);

    (node as HTMLElement).click();

    expect(onClick).toBeCalledTimes(1);
  });
});

describe("html setStyleAttribute", () => {
  test("basic", () => {
    const div = document.createElement("div");

    setStyleAttribute(div, {
      color: "red",
      fontSize: 20,
    });

    expect(div.style.color).equal("red");
    expect(div.style.fontSize).equal("20px");
  });
});
