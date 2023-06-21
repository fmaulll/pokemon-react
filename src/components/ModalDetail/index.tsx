import { FC, useState } from "react";
import { PokemonTypes } from "../../type";
import OutsideWrapper from "../OutsideWrapper";
import { RxCross2 } from "react-icons/rx";
import { GrRotateRight, GrRotateLeft } from "react-icons/gr";

interface Props {
  data: PokemonTypes | null;
  onClose: () => void;
}

const ModalDetail: FC<Props> = ({ data, onClose }) => {
  const [rotate, setRotate] = useState<boolean>(false);

  const handleRotate = () => {
    setRotate(!rotate);
  };

  return (
    <div data-testid="detail" className="h-screen bg-[rgba(0,0,0,0.6)] w-full top-0 left-0 fixed flex justify-center items-center z-30">
      <OutsideWrapper callback={onClose}>
        <div className="bg-white rounded-xl flex justify-center items-center flex-col p-8 min-w-[500px]">
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
