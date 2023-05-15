import { component$, } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { NavigationCounter } from '~/components/pokemons/navigation-counter';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { useNavigation } from '~/components/pokemons/useNavigation';
 

export default component$(() => {
  const {pokemonId, changePokemonId } = useNavigation()
  

  return (
    <>
      <PokemonImage  id={pokemonId.value} />
      <NavigationCounter  onChange={changePokemonId}  />
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
