import { createContext, FC, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface PokemonContextData {
  loading: boolean;
  setLoading: (bool: boolean) => void;
}

const initialValue = {
  loading: false,
  setLoading: () => {}
};

export const PokemonContext = createContext<PokemonContextData>(initialValue);

const { Provider } = PokemonContext;

const PokemonProvider: FC<Props> = ({ children }) => {
  const [loading, setLoadingPokemon] = useState<boolean>(false);

  const setLoading = (bool: boolean) => {
    setLoadingPokemon(bool);
  };

  return (
    <Provider value={{ loading, setLoading }}>
      {children}
    </Provider>
  );
};

export default PokemonProvider;