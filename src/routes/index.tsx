import { component$, } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
 

export default component$(() => {

 
  return (
    <>
    <PokemonImage/> 
    
    </>
  );
});

export const head: DocumentHead = {
  title: 'Hola mundo',
  meta: [
    {
      name: 'description',
      content: 'Site description',
    },
  ],
};
