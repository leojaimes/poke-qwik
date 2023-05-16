import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
    return (<>List client</>)
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
