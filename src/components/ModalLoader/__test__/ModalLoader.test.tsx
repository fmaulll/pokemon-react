import { describe } from "vitest";
import { render } from "@testing-library/react";
import ModalLoader from "..";

describe("<ModalLoader/>", () => {
  it("should display the loader component properly", () => {
    const { getByTestId } = render(<ModalLoader />);

    expect(getByTestId("loader")).toBeInTheDocument();
  });
});
