import { component$ } from '@builder.io/qwik';

import { type DocumentHead, Link, routeLoader$ } from '@builder.io/qwik-city';
import { getPokemoms } from '~/services/pokemonApi';

const usePokemonList = routeLoader$(async ({ params, query, redirect }) => {
    const res = await getPokemoms({
        limit: 10,
        offset: 0
    })
    return res
})
export default component$(() => {
    const { value: { results } } = usePokemonList()
    return (
        <>
            <div class="flex flex-col ">
                <span class="my-5 text-5xl">Status</span>
                <span class="my-5 text-5xl">Current offset: XXXX</span>
                <span class="my-5 text-5xl">Loading page</span>
            </div>
            <div class="mt-10">
                <Link class="btn btn-primary mr-2"> Previous </Link>
                <Link class="btn btn-primary mr-2"> Next </Link>
            </div>
            <div class="grid grid-cols-6 mt-5">
                {
                    results.map(({ name, url }, index) => (
                        <>
                            <div class="m-5 flex flex-col justify-center items-center">{name}</div>
                            <img src={url} alt={name} />
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