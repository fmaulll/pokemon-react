export type PokemonTypes = {
  id: number;
  name: string;
  imageFront: string;
  imageBack: string;
  weight: number;
  height: number;
  types: string;
};

export type PokemonTypeList = {
  name: string;
  url: string;
};

export type FilterTypes = {
  name: string;
  url: string;
};
