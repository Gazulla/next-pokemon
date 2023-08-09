import { useState, useEffect } from "react";
import { PokemonListElement } from "@/types";
import {
  MAX_NUM_POKEMONS_TO_FETCH,
  POKEMONS_PER_PAGE,
} from "@/constants/appConstants";

export default function usePokemon() {
  const [pokemons, setPokemons] = useState<PokemonListElement[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);

  const mapPokemon = (pokemonRaw: any) => {
    return {
      id: pokemonRaw.id,
      name: pokemonRaw.name,
      types: pokemonRaw.types.map(
        (ty: { type: { name: string } }) => ty.type.name
      ),
      moves: pokemonRaw.moves
        .slice(0, 5)
        .map((mov: { move: { name: string } }) => mov.move.name),
      img: pokemonRaw.sprites.other.dream_world.front_default,
      height: pokemonRaw.height,
    };
  };

  const getPokemonList = async () => {
    setLoading(true);
    console.log("Fetching!!");
    try {
      let limit = POKEMONS_PER_PAGE;
      const dif = MAX_NUM_POKEMONS_TO_FETCH - pokemons.length;
      if (dif < POKEMONS_PER_PAGE) {
        limit = dif;
      }
      if (pokemons.length >= MAX_NUM_POKEMONS_TO_FETCH) {
        setLoading(false);
        return;
      }
      const abortController = new AbortController();
      const result = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`,
        { signal: abortController.signal }
      );
      const data = await result.json();
      const proms = await data.results.map(async (pokemon: { url: string }) => {
        const res = await fetch(pokemon.url);
        const data = await res.json();
        return mapPokemon(data);
      });
      const fetchedPokemons = await Promise.all(proms);
      setPokemons((prev) => [...prev, ...fetchedPokemons]);
    } catch (error) {
      throw new Error("Error fetching data from the API.");
    } finally {
      setLoading(false);
    }
  };

  const nextPage = () => {
    setOffset((prev) => prev + POKEMONS_PER_PAGE);
  };

  useEffect(() => {
    getPokemonList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  return { pokemons, loadingPokemons: loading, nextPage };
}
