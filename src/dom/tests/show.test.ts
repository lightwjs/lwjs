/**
 * @vitest-environment jsdom
 */
import { describe, expect, test } from "vitest";
import { show } from "../../elements";
import { State } from "../../reactive";
import { render } from "../render";

describe("dom show", () => {
  test("renders true initially", () => {
    const container = document.createElement("div");

    const state = new State(true);

    render(show(state, "Yes"), container);

    expect(container.innerHTML).equal("Yes");
  });
  test("renders false initially", () => {
    const container = document.createElement("div");

    const state = new State(false);

    render(show(state, "Yes", "No"), container);

    expect(container.innerHTML).equal("No");
  });
  test("reacts to changes", () => {
    const container = document.createElement("div");

    const state = new State(true);

    render(show(state, "Yes", "No"), container);

    expect(container.innerHTML).equal("Yes");

    state.value = false;

    expect(container.innerHTML).equal("No");

    state.value = true;

    expect(container.innerHTML).equal("Yes");
  });
});
