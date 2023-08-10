import Layout from "@/components/Layout";
import Head from "next/head";
import usePokemon from "@/hooks/usePokemon";
import Filters from "@/components/Filters";
import useFilters from "@/hooks/useFilters";
import PokemonGrid from "@/components/PokemonGrid";

export default function Home() {
  const { pokemons, loadingPokemons, nextPage } = usePokemon();
  const { filterPokemons } = useFilters();
  const filteredPokemons = filterPokemons(pokemons);
  const numPokemons = pokemons.length;
  const numFilteredPokemons = filteredPokemons.length;

  return (
    <>
      <Head>
        <title>Pokemon Next App</title>
      </Head>
      <Layout>
        <div className="flex flex-col place-items-center w-full">
          <Filters numPokemons={numPokemons} numFilteredPokemons={numFilteredPokemons}></Filters>
          <PokemonGrid
            pokemons={filteredPokemons}
            numPokemons={numPokemons}
            numFilteredPokemons={numFilteredPokemons}
            loadingPokemons={loadingPokemons}
            nextPage={nextPage}
          ></PokemonGrid>
        </div>
      </Layout>
    </>
  );
}
