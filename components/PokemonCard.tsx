import { useState } from "react";
import Image from "next/image";
import { capWord } from "@/utils/miscFunctions";
import { PokemonListElement } from "@/types";
import { POKEMON_TYPES } from "@/constants/appConstants";
import Link from "next/link";

type Props = {
  pokemon: PokemonListElement;
  index: number;
};

export default function PokemonCard({ pokemon, index }: Props) {
  const [attacksShown, setAttacksShown] = useState(1);

  const addAttack = () => {
    if (attacksShown < 5) {
      setAttacksShown((prev) => prev + 1);
    }
  };

  // Color calcs
  const have2Types = pokemon.types.length > 1;
  const color1 = POKEMON_TYPES.find((t) => t.name === pokemon.types[0])?.color + "55";
  const color2 = have2Types
    ? POKEMON_TYPES.find((t) => t.name === pokemon.types[1])?.color + "55"
    : "#888888aa";
  const gradient = "linear-gradient(to right," + color1 + "," + color2 + ")";

  return (
    <article
      className="border-2 rounded-md p-5"
      style={{
        backgroundColor: color1,
        background: have2Types ? gradient : color1,
      }}
    >
      <div className="w-full relative aspect-square -top-7 -right-3">
        <Image
          fill
          priority={index < 8}
          src={pokemon.img}
          alt={pokemon.name}
          sizes="(max-width: 768px) 33vw, (max-width: 1200px) 50vw"
        ></Image>
      </div>

      <h3 className="font-bold text-2xl">{capWord(pokemon.name)}</h3>

      <div className="grid grid-cols-2">
        <div>
          <div>
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

          <Link key={pokemon.name} href={`/pokemon/${pokemon.id}`}>
            <button className="flex justify-center place-items-center gap-2 font-bold relative mr-3 mt-4 px-3 py-2 bg-red-600  hover:bg-red-500 duration-300 border-2 border-white rounded-md">
              <Image src="/static/pokeball.svg" alt="Pokeball" width={20} height={20}></Image>
              <p>Details</p>
            </button>
          </Link>
        </div>

        <div className="flex flex-col items-end">
          {pokemon.moves.slice(0, attacksShown).map((move) => {
            return (
              <div
                className="flex bg-slate-900 rounded-xl p-1 text-sm font-semibold px-3 mt-1 bg-opacity-30"
                key={pokemon.name + "-" + move}
              >
                <Image
                  className="mr-1 w-4"
                  width={15}
                  height={15}
                  alt="Attack"
                  src="/static/attack.svg"
                ></Image>{" "}
                {capWord(move)}
              </div>
            );
          })}
          {attacksShown < 5 ? (
            <button
              onClick={() => addAttack()}
              className="flex justify-center place-items-center gap-2 font-bold text-xl bg-red-600 hover:bg-red-500 border-white border-2 text-white rounded-full w-7/12 mt-3 pb-1 duration-300"
            >
              <p>+</p>
              <Image
                className="mr-1 w-4"
                width={15}
                height={15}
                alt="Attack"
                src="/static/attack.svg"
              ></Image>{" "}
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
