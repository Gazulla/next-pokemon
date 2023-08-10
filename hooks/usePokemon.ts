import { useContext, useRef } from "react";
import { PokemonContext } from "../context/pokemonContext";
import { useEffect } from "react";
import { MAX_NUM_POKEMONS_TO_FETCH, POKEMONS_PER_PAGE } from "@/constants/appConstants";

export default function usePokemon() {
  const {
    pokemons,
    setPokemons,
    loading,
    setLoading,
    offset,
    setOffset,
    isFirstFetch,
    setIsFirstFetch,
  } = useContext(PokemonContext);

  const mapPokemonCard = (pokemonRaw: any) => {
    return {
      id: pokemonRaw.id,
      name: pokemonRaw.name,
      types: pokemonRaw.types.map((ty: { type: { name: string } }) => ty.type.name),
      moves: pokemonRaw.moves.slice(0, 5).map((mov: { move: { name: string } }) => mov.move.name),
      img: pokemonRaw.sprites.other.dream_world.front_default,
      height: pokemonRaw.height,
    };
  };

  const getPokemonList = async () => {
    setLoading(true);
    try {
      const newOffset = offset + POKEMONS_PER_PAGE;

      // "Reaching fetch limit" calcs: no fetch more than necessary
      let limit = POKEMONS_PER_PAGE;
      const dif = MAX_NUM_POKEMONS_TO_FETCH - pokemons.length;
      if (dif < POKEMONS_PER_PAGE) {
        limit = dif;
      }
      if (pokemons.length >= MAX_NUM_POKEMONS_TO_FETCH) {
        setLoading(false);
        return;
      }

      // Get the list of pokemon URLs
      const result = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${newOffset}`
      );
      const data = await result.json();

      // Iterate every URL in the list to get the pokemon data
      const proms = await data.results.map(async (pokemon: { url: string }) => {
        const res = await fetch(pokemon.url);
        const data = await res.json();
        return mapPokemonCard(data);
      });
      const fetchedPokemons = await Promise.all(proms);

      setPokemons([...pokemons, ...fetchedPokemons]);

      // Set the new offset for the next fetch (Load more button)
      setOffset(newOffset);
    } catch (error) {
      throw new Error("Error fetching Pokemon List from the API.");
    } finally {
      setLoading(false);
    }
  };

  const nextPage = () => {
    getPokemonList();
  };

  useEffect(() => {
    if (isFirstFetch) {
      setIsFirstFetch(false);
      getPokemonList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { pokemons, loadingPokemons: loading, nextPage };
}
