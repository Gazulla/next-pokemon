import Layout from "@/components/Layout";
import PokemonCard from "@/components/PokemonCard";
import Head from "next/head";
import { PokemonListElement } from "@/types";
import usePokemon from "@/hooks/usePokemon";
import Spinner from "../components/Spinner";
import Filters from "@/components/Filters";
import useFilters from "@/hooks/useFilters";
import Image from "next/image";
import { MAX_NUM_POKEMONS_TO_FETCH } from "@/constants/appConstants";
import PokeButton from "@/components/PokeButton";

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
          {numFilteredPokemons !== 0 ? (
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-5">
              {filteredPokemons.map((pokemon: PokemonListElement, i) => {
                return <PokemonCard key={pokemon.name} pokemon={pokemon} index={i}></PokemonCard>;
              })}
            </section>
          ) : (
            <div className="mt-6 text-xl font-semibold">
              No pokemons found with the current filters applied.
            </div>
          )}

          {loadingPokemons ? (
            <Spinner></Spinner>
          ) : numPokemons >= MAX_NUM_POKEMONS_TO_FETCH ? (
            <p className="font-bold mt-10">You have loaded all Pokemons!!</p>
          ) : (
            <PokeButton onClick={nextPage}>
              <div className="w-8 h-8 relative">
                <Image src="/static/pokeball.svg" alt="Pokeball" fill></Image>
              </div>
              <p>MORE</p>
            </PokeButton>
          )}
        </div>
      </Layout>
    </>
  );
}
