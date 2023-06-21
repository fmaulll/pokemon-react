import { describe } from "vitest";
import { render } from "@testing-library/react";
import ModalDetail from "..";
const mockData = {
  name: "Beedrill",
  imageBack:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/15.png",
  imageFront:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png",
  height: 10,
  weight: 295,
  id: 15,
  types: "bug",
};

describe("<ModalDetail/>", () => {
  it("should display the detail component properly", () => {
    const { getByTestId } = render(<ModalDetail data={mockData} onClose={() => {}} />);

    expect(getByTestId("detail")).toBeInTheDocument();
  });
});
