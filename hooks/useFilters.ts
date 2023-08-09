import { useContext } from "react";
import { FilterContext } from "../context/filtersContext";
import { FiltersType, PokemonListElement } from "@/types";
import {
  POKEMON_MAX_HEIGHT,
  POKEMON_MIN_HEIGHT,
} from "@/constants/appConstants";

export default function useFilters() {
  const { filters, setFilters } = useContext(FilterContext);

  const changeFilters = (newFilters: FiltersType) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      minHeight: POKEMON_MIN_HEIGHT,
      maxHeight: POKEMON_MAX_HEIGHT,
      type: "all",
      word: "",
    });
  };

  const filterPokemons = (pokemons: PokemonListElement[]) => {
    return [...pokemons].filter((pokemon) => {
      return (
        (filters.type === "all" || pokemon.types.includes(filters.type)) &&
        pokemon.height >= filters.minHeight &&
        pokemon.height <= filters.maxHeight &&
        pokemon.name.includes(filters.word)
      );
    });
  };

  return { filters, changeFilters, filterPokemons, clearFilters };
}
