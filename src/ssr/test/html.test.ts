import { describe, expect, test } from "vitest";
import { htmlElToString, styleObjectToString } from "../html";
import { h } from "../../elements";
import { SsrRenderer } from "../SsrRenderer";

const renderer = new SsrRenderer();

describe("ssr html", () => {
  test("empty el", () => {
    const html = htmlElToString(h("div"), renderer);
    expect(html).equal("<div/>");
  });

  test("with children", () => {
    const html = htmlElToString(
      h("div", h("h1", "Title"), h("button", "+")),
      renderer
    );
    expect(html).equal("<div><h1>Title</h1><button>+</button></div>");
  });

  test("empty with attributes", () => {
    const html = htmlElToString(
      h(
        "div",
        { id: "test", className: "cls" },
        h("h1", "Title"),
        h("button", "+")
      ),
      renderer
    );
    expect(html).equal(
      `<div id="test" class="cls"><h1>Title</h1><button>+</button></div>`
    );
  });

  test("with children and attributes", () => {
    const html = htmlElToString(
      h("div", { id: "test", className: "cls" }),
      renderer
    );
    expect(html).equal(`<div id="test" class="cls"/>`);
  });

  test("style", () => {
    const styleStr = styleObjectToString({
      fontSize: 20,
      color: "red",
      backgroundColor: "#fff",
    });
    expect(styleStr).equal("font-size:20px;color:red;background-color:#fff;");
  });
});
