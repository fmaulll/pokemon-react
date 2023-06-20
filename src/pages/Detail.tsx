import { useContext, useEffect, useState } from "react";
import { PokemonContext } from "../context/PokemonContext";
import axios from "axios";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const { setLoading } = useContext(PokemonContext);
  const [data, setData] = useState()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        if (result.status === 200) {
            
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData()
  }, []);
  return <div>Detail</div>;
};

export default Detail;
