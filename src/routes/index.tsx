import { component$, useSignal, $ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { NavigationCounter } from '~/components/pokemons/navigation-counter';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { useNavigation } from '~/components/pokemons/useNavigation';
import { PokeType } from '~/utils/get-poke-image';
 

export default component$(() => {
  const pokeType = useSignal<PokeType>(PokeType.default);
  const {pokemonId, changePokemonId } = useNavigation()
  
  const toogleTurn = $(()=> {
    pokeType.value === PokeType.default  ? pokeType.value = PokeType.backShiny : pokeType.value = PokeType.default 
  })

  return (
    <>
      <PokemonImage  id={pokemonId.value} pokeType={pokeType.value} />
      <NavigationCounter  onChange={changePokemonId}  >

      </NavigationCounter>
      
      <button
          id="turnButton"
          onClick$={ toogleTurn }
          class="btn btn-primary mt-2"
        >
          Turn
      </button>

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
