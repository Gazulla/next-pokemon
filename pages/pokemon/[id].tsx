import Layout from "@/components/Layout";
import usePokemon from "@/hooks/usePokemon";
import { capWord } from "@/utils/miscFunctions";
import Head from "next/head";

export default function Pokemon({ pokemon }: any) {
  return (
    <>
      <Head>
        <title> {capWord(pokemon.name)}</title>
      </Head>
      <Layout>{pokemon.name}</Layout>
    </>
  );
}

const mapPokemonDetails = (pokemonRaw: any) => {
  return {
    id: pokemonRaw.id,
    name: pokemonRaw.name,
    types: pokemonRaw.types.map(
      (ty: { type: { name: string } }) => ty.type.name
    ),
    moves: pokemonRaw.moves
      .slice(0, 10)
      .map((mov: { move: { name: string } }) => mov.move.name),
    img: pokemonRaw.sprites.other.dream_world.front_default,
    height: pokemonRaw.height,
  };
};

const getPokemonDetails = async ({ id }: { id: number }) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    return mapPokemonDetails(data);
  } catch (error) {
    throw new Error("Error fetching Pokemon Details from the API.");
  }
};

export async function getServerSideProps(context: any) {
  const id = context.params.id;
  const pokemon = await getPokemonDetails({ id });
  return { props: { pokemon } };
}
