/**
 * @vitest-environment jsdom
 */
import { describe, expect, test } from "vitest";
import { show } from "../../elements";
import { Signal } from "../../reactive";
import { DomRenderer } from "../DomRenderer";

describe("dom show", () => {
  test("renders true initially", () => {
    const container = document.createElement("div");

    const renderer = new DomRenderer();

    const state = new Signal(true, renderer.ctx);

    renderer.render(show(state, "Yes"), container);

    expect(container.innerHTML).equal("Yes");
  });
  test("renders false initially", () => {
    const container = document.createElement("div");

    const renderer = new DomRenderer();

    const state = new Signal(false, renderer.ctx);

    renderer.render(show(state, "Yes", "No"), container);

    expect(container.innerHTML).equal("No");
  });
  test("reacts to changes", () => {
    const container = document.createElement("div");

    const renderer = new DomRenderer();

    const state = new Signal(true, renderer.ctx);

    renderer.render(show(state, "Yes", "No"), container);

    expect(container.innerHTML).equal("Yes");

    state.value = false;

    expect(container.innerHTML).equal("No");

    state.value = true;

    expect(container.innerHTML).equal("Yes");
  });
});
