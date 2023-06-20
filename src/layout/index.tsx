import { FC, useContext } from "react";
import { PokemonContext } from "../context/PokemonContext";
import ModalLoader from "../components/ModalLoader";

interface Props {
  children: React.ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const { loading } = useContext(PokemonContext);
  return (
    <div className="min-h-screen bg-gray-800">
      {children}
      {loading ? <ModalLoader /> : null}
    </div>
  );
};

export default Layout;
