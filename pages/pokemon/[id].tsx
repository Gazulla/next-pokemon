import Layout from "@/components/Layout";
import PokemonStat from "@/components/PokemonStat";
import { POKEMON_TYPES } from "@/constants/appConstants";
import { PokemonDetails } from "@/types";
import { capWord } from "@/utils/miscFunctions";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

type Props = {
  pokemon: PokemonDetails;
};

export default function Pokemon({ pokemon }: Props) {
  const addZero = (str: string) => {
    const len = str.length;
    return len >= 3 || len <= 0 ? str : len === 1 ? "00" + str : "0" + str;
  };

  // Color calcs
  const have2Types = pokemon.types.length > 1;
  const color1 = POKEMON_TYPES.find((t) => t.name === pokemon.types[0])?.color + "55";
  const color2 = have2Types
    ? POKEMON_TYPES.find((t) => t.name === pokemon.types[1])?.color + "55"
    : "#888888aa";
  const gradient = "linear-gradient(to right," + color1 + "," + color2 + ")";
  return (
    <>
      <Head>
        <title> {capWord(pokemon.name)}</title>
      </Head>
      <Layout>
        <section className="flex flex-col  w-full mt-6 md:max-w-xl lg:max-w-6xl">
          <Link href={`/`}>
            <div className="flex mb-2 font-semibold text-lg">
              <Image
                className="mr-1 w-4"
                width={15}
                height={15}
                alt="Ability"
                src="/static/left_arrow.svg"
              ></Image>
              <span>Return</span>
            </div>
          </Link>

          <div
            className="grid grid-cols-1 lg:grid-cols-3 w-full gap-6 p-5 md:p-10 rounded-xl border-white border-2"
            style={{
              backgroundColor: color1,
              background: have2Types ? gradient : color1,
            }}
          >
            {/* Col 1 */}
            <div className="col-span-1">
              {/* Image */}
              <div className="w-full relative aspect-square">
                <Image
                  fill
                  priority={true}
                  src={pokemon.img}
                  alt={pokemon.name}
                  sizes="(max-width: 768px) 33vw, (max-width: 1200px) 50vw"
                ></Image>
              </div>
            </div>

            {/* Col 2 */}
            <div className="">
              {/* Nme and Number */}
              <div className="inline-block text-2xl mr-3 px-2 rounded-lg bg-slate-500 bg-opacity-40 mt-5">
                {addZero(pokemon.id.toString())}
              </div>
              <h3 className="inline-block font-bold text-3xl">{capWord(pokemon.name)}</h3>

              {/* Types */}
              <div className="mt-1">
                {pokemon.types.map((type, i) => {
                  return (
                    <div
                      style={{
                        backgroundColor:
                          POKEMON_TYPES.find((t) => t.name === pokemon.types[i])?.color + "88",
                      }}
                      key={pokemon.name + "-" + type}
                      className="rounded-lg inline-block mr-2 mt-2 pb-0 px-3 font-semibold"
                    >
                      {capWord(type)}
                    </div>
                  );
                })}
              </div>

              {/* Stats */}
              <div className="mt-5">
                <PokemonStat name={"HP"} value={pokemon.hp}></PokemonStat>
                <PokemonStat name={"Attack"} value={pokemon.attack}></PokemonStat>
                <PokemonStat name={"Defense"} value={pokemon.defense}></PokemonStat>
                <PokemonStat name={"S-Attack"} value={pokemon.specialAttack}></PokemonStat>
                <PokemonStat name={"S-Defense"} value={pokemon.specialDefense}></PokemonStat>
                <PokemonStat name={"Speed"} value={pokemon.speed}></PokemonStat>
              </div>
            </div>

            {/* Col 3 */}
            <div className="grid md:grid-cols-2  ">
              <div>
                {/* Abilities */}
                <h4 className="text-2xl mt-5">Abilities</h4>
                <ul className="mr-6">
                  {pokemon.abilities.map((ability) => {
                    return (
                      <li
                        className="inline-flex bg-slate-900 rounded-xl p-1 text-sm font-semibold px-3 mt-2 mr-2 bg-opacity-30"
                        key={ability}
                      >
                        <Image
                          className="mr-1 w-4"
                          width={15}
                          height={15}
                          alt="Ability"
                          src="/static/attack.svg"
                        ></Image>{" "}
                        {capWord(ability)}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                {/* Moves */}
                <h4 className="text-2xl mt-5">Moves</h4>
                <ul className="mr-6">
                  {pokemon.moves.map((move) => {
                    return (
                      <li
                        className="inline-flex bg-slate-900 rounded-xl p-1 text-sm font-semibold px-3 mt-2 mr-2  bg-opacity-30"
                        key={move}
                      >
                        <Image
                          className="mr-1 w-4"
                          width={15}
                          height={15}
                          alt="Move"
                          src="/static/attack.svg"
                        ></Image>{" "}
                        {capWord(move)}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

const mapPokemonDetails = (pokemonRaw: any) => {
  return {
    id: pokemonRaw.id,
    name: pokemonRaw.name,
    types: pokemonRaw.types.map((ty: { type: { name: string } }) => ty.type.name),
    moves: pokemonRaw.moves.slice(0, 8).map((mov: { move: { name: string } }) => mov.move.name),
    img: pokemonRaw.sprites.other.dream_world.front_default,
    height: pokemonRaw.height,
    weight: pokemonRaw.weight,
    abilities: pokemonRaw.abilities
      .slice(0, 8)
      .map((abi: { ability: { name: string } }) => abi.ability.name),
    hp: pokemonRaw.stats[0].base_stat,
    attack: pokemonRaw.stats[1].base_stat,
    defense: pokemonRaw.stats[2].base_stat,
    specialAttack: pokemonRaw.stats[3].base_stat,
    specialDefense: pokemonRaw.stats[4].base_stat,
    speed: pokemonRaw.stats[5].base_stat,
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
