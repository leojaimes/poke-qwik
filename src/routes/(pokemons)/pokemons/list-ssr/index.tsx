import { component$, useComputed$, useSignal, $, useVisibleTask$ } from '@builder.io/qwik';

import { type DocumentHead, Link, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { getPokemoms } from '~/services/pokemonApi';
import { PokeType } from '~/utils/get-poke-image';

import { Modal } from '~/components/shared';
import type { ShortPokemonData } from '~/interfaces/pokemons';

import { textGeneration } from '~/services/openAi';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

export const usePokemonList = routeLoader$(async ({ query, redirect, pathname }) => {
    const offset = Number(query.get('offset') || '0')
    if (offset < 0 || isNaN(offset)) {
        redirect(301, pathname)
    }

    const res = await getPokemoms({
        limit: 10,
        offset: offset
    })
    return {
        res,
        offset: offset,
    }
})


export default component$(() => {
    const { value: { offset, res } } = usePokemonList()
    const location = useLocation()
    const showModal = useSignal(false)
    const pokemonClicked = useSignal<ShortPokemonData | undefined>(undefined)
    const chatGptRes = useSignal('')

    const showPokeModal = $(async (pokemon: ShortPokemonData) => {
        showModal.value = true;
        pokemonClicked.value = pokemon
        chatGptRes.value = ''
        // const res = await textGeneration(`Write something interesting about ${pokemonClicked.value!.name!}`)
        // pokemon.description = res.response

    })
    useVisibleTask$(async ({ track }) => {
        track(() => pokemonClicked.value)
        if (pokemonClicked.value) {
            const res = await textGeneration(`write something interesting about ${pokemonClicked.value!.name!}`)
            chatGptRes.value = res.response
        }

    })
    const closePokeModal = $(() => { showModal.value = false })
    const currentoffset = useComputed$(() => {
        const offsetString = new URLSearchParams(location.url.search)
        return Number(offsetString.get('offset') || 0)
    })
    return (
        <>
            <div class="flex flex-col ">
                <span class="my-5 text-5xl">Status</span>
                <span class="my-5 text-5xl">Current offset: {currentoffset.value}</span>
                {/* <span class="my-5 text-5xl">{location.isNavigating ? 'Loading...' : ''}</span> */}
            </div>
            <div class="mt-10">
                <Link class="btn btn-primary mr-2 cursor-pointer" href={`/pokemons/list-ssr/?offset=${offset - 1 >= 0 ? offset - 10 : 0}`}> Previous </Link>
                <Link class="btn btn-primary mr-2 cursor-pointer" href={`/pokemons/list-ssr/?offset=${offset + 10}`} > Next </Link>
            </div>
            <div class="grid grid-cols-6 mt-5">
                {
                    res.results.map((pokemon, index) => (
                        <>
                            <div onClick$={() => showPokeModal(pokemon)} key={`${pokemon.name} - ${index}`} class="m-5 flex flex-col justify-center items-center">
                                <PokemonImage id={pokemon.id!} pokeType={PokeType.shiny} show size={100} />
                                <span class="capitalize">{pokemon.name}</span>
                            </div>

                        </>
                    ))
                }
            </div>
            <Modal visible={showModal.value && !!pokemonClicked.value} close={closePokeModal} >
                <div q:slot='title'>{pokemonClicked.value?.name}</div>
                <div class="flex flex-col justify-center items-center" q:slot='content'>
                    {pokemonClicked.value && pokemonClicked.value!.id && <PokemonImage id={pokemonClicked.value!.id!} show />}
                    <span>{chatGptRes.value}</span>
                </div>
            </Modal>
        </>
    )
});

export const head: DocumentHead = {
    title: 'List SSR',
    meta: [
        {
            name: "description",
            content: 'List SSR Description'
        }
    ]
}