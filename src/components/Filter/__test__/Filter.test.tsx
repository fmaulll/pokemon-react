import { describe } from "vitest";
import { render } from "@testing-library/react";
import Filter from "..";

describe("<Filter/>", () => {
  it("should display the filter component properly", () => {
    const { getByTestId } = render(<Filter total={0} onResetFilter={() => {}} onSubmitFilter={() => {}} typeList={[]} />);

    expect(getByTestId("filter")).toBeInTheDocument();
  });
});
