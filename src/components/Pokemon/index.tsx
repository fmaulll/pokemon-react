import { FC } from "react";
import { PokemonTypes } from "../../type";

interface Props {
  data: PokemonTypes;
  onClick: () => void
}

const Pokemon: FC<Props> = ({ data, onClick }) => {
  return (
    <div onClick={onClick} className="cursor-pointer relative rounded-lg w-full bg-white flex flex-col justify-center items-center p-4">
      <h1 className="font-bold text-xl">{data.name}</h1>
      <img src={data.image} alt={data.name} />
    </div>
  );
};

export default Pokemon;