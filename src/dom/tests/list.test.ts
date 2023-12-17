/**
 * @vitest-environment jsdom
 */
import { describe, expect, test } from "vitest";
import { h, list } from "../../elements";
import { Signal } from "../../reactive";
import { DomRenderer } from "../DomRenderer";

describe("dom list", () => {
  test("basic", () => {
    const container = document.createElement("div");

    const renderer = new DomRenderer();

    const initialItems = [{ name: "a" }, { name: "b" }];

    const items = new Signal(initialItems, renderer.ctx);

    renderer.render(
      list(items, (item) => h("li", item.name)),
      container
    );

    expect(container.innerHTML).equal("<li>a</li><li>b</li>");

    // remove last
    const copy = [...items.value];
    copy.pop();
    items.value = copy;
    expect(container.innerHTML).equal("<li>a</li>");

    items.value = initialItems;
    expect(container.innerHTML).equal("<li>a</li><li>b</li>");

    // append one item
    items.value = [...items.value, { name: "c" }];
    expect(container.innerHTML).equal("<li>a</li><li>b</li><li>c</li>");

    items.value = initialItems;
    expect(container.innerHTML).equal("<li>a</li><li>b</li>");

    // clear
    items.value = [];
    expect(container.innerHTML).equal("");

    // fresh
    items.value = initialItems;
    expect(container.innerHTML).equal("<li>a</li><li>b</li>");
  });
});
