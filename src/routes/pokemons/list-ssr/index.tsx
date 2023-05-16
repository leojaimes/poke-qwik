import { component$, useComputed$, useSignal } from '@builder.io/qwik';

import { type DocumentHead, Link, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { getPokemoms } from '~/services/pokemonApi';

const usePokemonList = routeLoader$(async ({ params, query, redirect }) => {
    const offset = query.get('offset')

    const res = await getPokemoms({
        limit: 10,
        offset: Number(offset)
    })
    return {
        res,
        offset: Number(offset),
    }
})
export default component$(() => {
    const { value: { offset, res } } = usePokemonList()
    const location = useLocation()
    const currentoffset = useComputed$(() => {
        const offsetString = new URLSearchParams(location.url.search)
        return Number(offsetString.get('offset') || 0)
    })
    return (
        <>
            <div class="flex flex-col ">
                <span class="my-5 text-5xl">Status</span>
                <span class="my-5 text-5xl">Current offset: {currentoffset}</span>
                <span class="my-5 text-5xl">Loading page</span>
            </div>
            <div class="mt-10">
                <Link class="btn btn-primary mr-2 cursor-pointer" href={`/pokemons/list-ssr/?offset=${offset - 1 >= 0 ? offset - 1 : 0}`}> Previous </Link>
                <Link class="btn btn-primary mr-2 cursor-pointer" href={`/pokemons/list-ssr/?offset=${offset + 1}`} > Next </Link>
            </div>
            <div class="grid grid-cols-6 mt-5">
                {
                    res.results.map(({ name }, index) => (
                        <>
                            <div key={`${name} - ${index}`} class="m-5 flex flex-col justify-center items-center">
                                <span class="capitalize">{name}</span>
                            </div>
                        </>
                    ))
                }
            </div>
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