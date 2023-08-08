import Layout from "@/components/Layout";
import PokemonCard from "@/components/PokemonCard";
import Head from "next/head";
import { PokemonListElement } from "@/types";
import usePokemon from "@/hooks/usePokemon";
import Spinner from "../components/Spinner";

export default function Home() {
  const { pokemons, loadingPokemons, nextPage } = usePokemon();

  return (
    <>
      <Head>
        <title>Pokemon List</title>
      </Head>
      <Layout>
        <div className="flex flex-col place-items-center">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-5">
            {pokemons.map((pokemon: PokemonListElement, i) => {
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
          ) : (
            <button
              className={`p-4 bg-slate-800 border-white border-2 font-bold w-9/12 mt-8 rounded-md hover:bg-slate-700 hover:shadow-xl duration-300`}
              onClick={nextPage}
            >
              MÁS
            </button>
          )}
        </div>
      </Layout>
    </>
  );
}
