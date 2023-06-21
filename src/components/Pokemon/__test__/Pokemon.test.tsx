import { describe } from "vitest";
import { render } from "@testing-library/react";
import Pokemon from "..";

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

describe("<Pokemon/>", () => {
  it("should display the pokemon component properly", () => {
    const { getByTestId } = render(
      <Pokemon data={mockData} onClick={() => {}} />
    );

    expect(getByTestId("pokemon")).toBeInTheDocument();
  });
});
