import Layout from '@/components/Layout'
import Head from 'next/head'
import { useEffect, useState } from 'react';

import { PokemonCard } from '@/types';

import { NUM_POKEMON_TO_FETCH } from "../constants/appConstants"
import { promises } from 'dns';
import usePokemon from '@/hooks/usePokemon';

export default function Home() {
  const { pokemons } = usePokemon();

  return (
    <>
      <Head>
        <title>All Pokemons</title>
      </Head>
      <Layout><div>
        {pokemons.map((pokemon: PokemonCard) => { return <p key={pokemon.id}>{pokemon.name}</p> })}
      </div>
      </Layout>
    </>
  )
}
