import React from "react";
import { render } from "@testing-library/react";
import Layout from "../components/Layout";

describe("Layout component", () => {
  it("renders children without styles", () => {
    const { getByText, container } = render(
      <Layout>Test Children</Layout>
    );
    const layoutElement = container.querySelector(".min-h-screen");
    expect(layoutElement).toBeInTheDocument();
    expect(layoutElement).toHaveTextContent("Test Children");
    expect(layoutElement.getAttribute("styles")).toBeNull();
  });

  it("renders children with styles", () => {
    const { getByText, container } = render(
      <Layout styles="custom-styles">Test Children</Layout>
    );
    const layoutElement = container.querySelector(".min-h-screen");
    expect(layoutElement).toBeInTheDocument();
    expect(layoutElement).toHaveClass("custom-styles");
    expect(layoutElement).toHaveTextContent("Test Children");
  });
});

