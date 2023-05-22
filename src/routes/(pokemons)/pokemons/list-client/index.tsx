import { component$, $, useTask$, useOnDocument, useContext } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { getPokemoms } from '~/services/pokemonApi';
import { PokeType } from '~/utils/get-poke-image';
import type { PokemonListPageState } from '~/context';
import { PokemonListContext } from '~/context';

export const usePokemonList = routeLoader$(async ({ query, redirect, pathname }) => {
    const offset = Number(query.get('offset') || '0')
    if (offset < 0 || isNaN(offset)) {
        redirect(301, pathname)
    }

    const res = await getPokemoms({
        limit: 30,
        offset: offset
    })
    return {
        res,
        offset: offset,
    }
})

export default component$(() => {
    const { value: { offset: initialOffset, res: { results: initialPokemons } } } = usePokemonList()
    const initialPokePageState: PokemonListPageState = {
        offset: initialOffset,
        pokemons: initialPokemons,
        isLoading: false,
    }
    const pokemonsPageState = useContext(PokemonListContext, initialPokePageState)
    //const { offset, pokemons, changeOffset } = usePokemonPageState(initialPokePageState)


    // useVisibleTask$(async ({ cleanup, track }) => {
    //     console.log('useVisibleTask')

    //     track(() => pokemonsPageState.offset)

    //     const res = await getPokemoms({
    //         limit: 30,
    //         offset: pokemonsPageState.offset
    //     })
    //     pokemonsPageState.isLoading = false
    //     pokemonsPageState.pokemons = [...pokemonsPageState.pokemons, ...res.results]

    // })

    useTask$(async ({ track }) => {
        console.log('useTask')
        track(() => pokemonsPageState.offset)

        const res = await getPokemoms({
            limit: 30,
            offset: pokemonsPageState.offset
        })
        pokemonsPageState.isLoading = false
        pokemonsPageState.pokemons = [...pokemonsPageState.pokemons, ...res.results]
    })


    useOnDocument('scroll', $(() => {
        //console.log('body scrolled', e);
        const maxScroll = document.body.scrollHeight;
        const currentScroll = window.scrollY + window.innerHeight
        console.log({
            maxScroll,
            currentScroll
        })
        if (currentScroll + 200 >= maxScroll && pokemonsPageState.isLoading === false) {
            pokemonsPageState.offset += 10
            pokemonsPageState.isLoading = true
        }
    }))

    return (
        <>
            <div class="flex flex-col ">
                <span class="my-5 text-5xl">Status</span>
                <span class="my-5 text-5xl">Current offset: {pokemonsPageState.offset}</span>
                {/* <span class="my-5 text-5xl">{location.isNavigating ? 'Loading...' : ''}</span> */}
            </div>
            <div class="mt-10">
                <button class="btn btn-primary mr-2 cursor-pointer" onClick$={() => { pokemonsPageState.offset -= 10 }}> Previous </button>
                <button class="btn btn-primary mr-2 cursor-pointer" onClick$={() => { pokemonsPageState.offset += 10 }} > Next </button>
            </div>
            <div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5">
                {
                    pokemonsPageState.pokemons.map(({ name, id }, index) => (

                        <div key={`${name} - ${index}`} class="m-5 flex flex-col justify-center items-center">
                            <PokemonImage id={id!} pokeType={PokeType.shiny} show size={100} />
                            <span class="capitalize">{name}</span>
                        </div>


                    ))
                }
            </div>
        </>
    )
});

export const head: DocumentHead = {
    title: 'List Client',
    meta: [
        {
            name: 'description',
            content: 'List Client description',
        },
    ],
};
