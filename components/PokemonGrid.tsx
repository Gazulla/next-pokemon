import PokemonCard from "@/components/PokemonCard";
import { PokemonListElement } from "@/types";
import Spinner from "../components/Spinner";
import Image from "next/image";
import { MAX_NUM_POKEMONS_TO_FETCH } from "@/constants/appConstants";
import PokeButton from "@/components/PokeButton";

export default function PokemonGrid({
  pokemons,
  numPokemons,
  numFilteredPokemons,
  loadingPokemons,
  nextPage,
}: {
  pokemons: PokemonListElement[];
  numPokemons: number;
  numFilteredPokemons: number;
  loadingPokemons: boolean;
  nextPage: () => void;
}) {
  return (
    <>
      {numFilteredPokemons !== 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-5">
          {pokemons.map((pokemon: PokemonListElement, i) => {
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
    </>
  );
}
