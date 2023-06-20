import axios from "axios";
import { useContext, useEffect, useState, UIEvent } from "react";
import Filter from "../components/Filter";
import Pokemon from "../components/Pokemon";
import { FilterTypes, PokemonTypeList, PokemonTypes } from "../type";
import { PokemonContext } from "../context/PokemonContext";
import { useNavigate } from "react-router-dom";
import ModalDetail from "../components/ModalDetail";

type AllPokemonType = {
  name: string;
  url: string;
};

type PokemonByType = {
  pokemon: {
    name: string;
    url: string;
  };
};

const Home = () => {
  const navigate = useNavigate();
  const { setLoading } = useContext(PokemonContext);
  const [idDetail, setIdDetail] = useState<number | null>(null)
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [allPokemon, setAllPokemon] = useState<PokemonTypes[]>([]);
  const [typeList, setTypeList] = useState<PokemonTypeList[]>([]);

  const getPokemon = async (pokemon: AllPokemonType) => {
    setLoading(true);
    try {
      const result = await axios.get(pokemon.url);
      if (result.status === 200) {
        const { data } = result;
        setAllPokemon((prev) => {
          return [
            ...prev,
            {
              name:
                data.name[0].toUpperCase() +
                data.name.slice(1, data.name.length),
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
              height: data.height,
              weight: data.weight,
              id: data.id,
              types: data.types[0].type.name,
            },
          ];
        });
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const getAllPokemon = async () => {
    setLoading(true);
    try {
      const result = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}`
      );
      if (result.status === 200) {
        const { results } = result.data;
        results.map((item: AllPokemonType) => {
          getPokemon(item);
        });
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const getAllPokemonType = async () => {
    setLoading(true);
    try {
      const result = await axios.get("https://pokeapi.co/api/v2/type");
      if (result.status === 200) {
        const { results } = result.data;
        setTypeList(results);
      }
    } catch (error) {
      alert(error);
    }
  };

  const getAllPokemonByType = async (url: string) => {
    setLoading(true);
    try {
      const result = await axios.get(url);
      if (result.status === 200) {
        const { pokemon } = result.data;
        pokemon?.map((item: PokemonByType) => {
          setAllPokemon([]);
          getPokemon(item.pokemon);
        });
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeFilter = (filter: FilterTypes) => {
    setIsFilter(true);
    getAllPokemonByType(filter.url);
  };

  const handleResetFilter = () => {
    setAllPokemon([]);
    setIsFilter(false);
    setOffset(0);
    getAllPokemon();
  };

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    if (
      target.scrollHeight - Math.ceil(target.scrollTop) ===
        target.clientHeight &&
      !isFilter &&
      allPokemon.length % 10 === 0
    ) {
      setOffset((prev) => prev + 10);
    }
  };

  useEffect(() => {
    getAllPokemon();
  }, [offset]);

  useEffect(() => {
    getAllPokemonType();
  }, []);

  return (
    <div
      className="overflow-y-scroll h-[100vh] px-8 pb-8"
      onScroll={handleScroll}
    >
      <Filter
        typeList={typeList}
        onSubmitFilter={handleChangeFilter}
        onResetFilter={handleResetFilter}
      />
      <div className="grid grid-cols-6 gap-4 mt-28">
        {allPokemon.map((item, index) => (
          <Pokemon
            data={item}
            key={index}
            onClick={() => {
              setOpenDetail(true)
              setIdDetail(item.id)
            }}
          />
        ))}
      </div>
      {openDetail && (
        <ModalDetail
          onClose={() => {
            setOpenDetail(false)
            setIdDetail(null)
          }}
          id={idDetail}
        />
      )}
    </div>
  );
};

export default Home;
