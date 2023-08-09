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

export default function Home() {
  const { pokemons, loadingPokemons, nextPage } = usePokemon();
  const { filterPokemons } = useFilters();
  const filteredPokemons = filterPokemons(pokemons);
  const numPokemons = pokemons.length;
  return (
    <>
      <Head>
        <title>Pokemon Next App</title>
      </Head>
      <Layout>
        <div className="flex flex-col place-items-center">
          <Filters numPokemons={numPokemons}></Filters>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-5">
            {filteredPokemons.map((pokemon: PokemonListElement, i) => {
              return (
                <PokemonCard
                  key={pokemon.name}
                  pokemon={pokemon}
                  index={i}
                ></PokemonCard>
              );
            })}
          </section>
          {loadingPokemons ? (
            <Spinner></Spinner>
          ) : numPokemons >= MAX_NUM_POKEMONS_TO_FETCH ? (
            <p className="font-bold">You have loaded all Pokemons!!</p>
          ) : (
            <button
              className={`flex justify-center place-items-center gap-2 relative  p-4 bg-red-600 hover:bg-red-500 border-black border-2 text-white font-bold w-6/12 mt-8 rounded-md  hover:shadow-xl duration-300`}
              onClick={nextPage}
            >
              <div className="w-8 h-8 relative">
                <Image
                  src="/static/pokeball.svg"
                  alt="Next Pokemon App"
                  fill
                ></Image>
              </div>
              <p>MORE</p>
            </button>
          )}
        </div>
      </Layout>
    </>
  );
}
