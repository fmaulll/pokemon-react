import { describe } from "vitest";
import { render } from "@testing-library/react";
import Home from "..";

describe("<Home/>", () => {
  it("should display the home page properly", () => {
    const { getByTestId } = render(<Home />);

    expect(getByTestId("home")).toBeInTheDocument();
  });

  it("should display the filter properly", () => {
    const { getByTestId } = render(<Home />);

    expect(getByTestId("filter")).toBeInTheDocument();
  });
});
