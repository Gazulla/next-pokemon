import { FilterContextProvider } from "@/context/filtersContext";
import { PokemonContextProvider } from "@/context/pokemonContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PokemonContextProvider>
      <FilterContextProvider>
        <Component {...pageProps} />
      </FilterContextProvider>
    </PokemonContextProvider>
  );
}
