import { component$ } from '@builder.io/qwik';

import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
    return (<>List SSR</>)
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