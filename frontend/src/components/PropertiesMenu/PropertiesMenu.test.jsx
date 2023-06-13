import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "vitest";
import PropertiesMenu from ".";

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders the properties menu correctly", () => {
  const properties = {
    // psets: { ... },
    // mats: { ... },
    // type: { ... },
    // Other properties
  };

  act(() => {
    render(<PropertiesMenu properties={properties} />, container);
  });

  // Assertions
  expect(container.querySelector("#ifc-property-menu-root")).toBeTruthy();
});

it("creates property entries correctly", () => {
  const properties = {
    Key1: "Value1",
    Key2: "Value2",
    // Other properties
  };

  act(() => {
    render(<PropertiesMenu properties={properties} />, container);
  });

  // Assertions
  expect(container.querySelectorAll(".ifc-property-item")).toHaveLength(2);
  expect(container.querySelector(".ifc-property-item:nth-child(1) .ifc-property-value").textContent).toBe("Value1");
  expect(container.querySelector(".ifc-property-item:nth-child(2) .ifc-property-value").textContent).toBe("Value2");
});

it("logs the GlobalId when button is clicked", () => {
  const properties = {
    GlobalId: { value: "123456" },
    // Other properties
  };

  global.console.log = jest.fn();

  act(() => {
    render(<PropertiesMenu properties={properties} />, container);
  });

  const button = container.querySelector("button");
  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  // Assertion
  expect(global.console.log).toHaveBeenCalledWith("123456");
});
