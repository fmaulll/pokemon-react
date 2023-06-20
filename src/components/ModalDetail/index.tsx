import { FC, useContext, useEffect, useState } from "react";
import { PokemonTypesDetail } from "../../type";
import OutsideWrapper from "../OutsideWrapper";
import { RxCross2 } from "react-icons/rx";
import { GrRotateRight, GrRotateLeft } from "react-icons/gr";
import { PokemonContext } from "../../context/PokemonContext";
import axios from "axios";

interface Props {
  id: number | null;
  onClose: () => void;
}

const ModalDetail: FC<Props> = ({ id, onClose }) => {
  const { setLoading } = useContext(PokemonContext);
  const [rotate, setRotate] = useState<boolean>(false);
  const [data, setData] = useState<PokemonTypesDetail | null>(null);

  const handleRotate = () => {
    setRotate(!rotate);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        if (result.status === 200) {
          const detail = result.data;
          setData({
            id: detail.id,
            height: detail.height,
            imageBack: detail.sprites.back_default,
            imageFront: detail.sprites.front_default,
            types: detail.types[0].type.name,
            name:
              detail.name[0].toUpperCase() +
              detail.name.slice(1, detail.name.length),
            weight: detail.weight,
          });
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-screen bg-[rgba(0,0,0,0.6)] w-full top-0 left-0 fixed flex justify-center items-center z-30">
      <OutsideWrapper callback={onClose}>
        <div className="bg-white rounded-xl flex justify-center items-center flex-col p-8 w-[600px]">
          <div className="w-full flex justify-end">
            <div
              onClick={onClose}
              className="hover:bg-red-500 rounded-full p-2 cursor-pointer"
            >
              <RxCross2 size={30} />
            </div>
          </div>
          <div className="w-full flex justify-center items-center flex-col">
            <h1 className="text-2xl font-bold">{data?.name}</h1>
            <img
              className="w-44"
              src={!rotate ? `${data?.imageFront}` : `${data?.imageBack}`}
              alt={data?.name}
            />
            <div
              className="flex items-center cursor-pointer"
              onClick={handleRotate}
            >
              Rotate {!rotate ? <GrRotateRight /> : <GrRotateLeft />}
            </div>
            <div className="grid grid-cols-3 w-full mt-8">
              <div className="flex flex-col justify-center items-center border">
                <p className="font-bold">Height</p>
                <p>{data?.height}</p>
              </div>
              <div className="flex flex-col justify-center items-center border">
                <p className="font-bold">Weight</p>
                <p>{data?.weight}</p>
              </div>
              <div className="flex flex-col justify-center items-center border">
                <p className="font-bold">Type</p>
                <p>{data?.types}</p>
              </div>
            </div>
          </div>
        </div>
      </OutsideWrapper>
    </div>
  );
};

export default ModalDetail;
