/* eslint-disable react/prop-types */
import { createContext, useRef, useState } from "react";
import { ChildrenType, PokemonContextType, PokemonListElement } from "@/types";
import { POKEMONS_PER_PAGE } from "@/constants/appConstants";

type Props = {
  children: ChildrenType;
};

export const PokemonContext = createContext<PokemonContextType>({} as any);

export function PokemonContextProvider({ children }: Props) {
  const [pokemons, setPokemons] = useState<PokemonListElement[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFirstFetch, setIsFirstFetch] = useState<boolean>(true);

  /* Negative value for the first fetch */
  const [offset, setOffset] = useState<number>(-POKEMONS_PER_PAGE);

  return (
    <PokemonContext.Provider
      value={{
        pokemons,
        setPokemons,
        loading,
        setLoading,
        offset,
        setOffset,
        isFirstFetch,
        setIsFirstFetch,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
}
