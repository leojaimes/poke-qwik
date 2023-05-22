import { component$, } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { NavigationCounter } from '~/components/pokemons/navigation-counter';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { usePokemonGame } from '~/hooks/pokemon/usePokemonGame';



export default component$(() => {
  const { pokeType, pokemonId, isPokemonVisible, onChange, goToPokemon, toogleTurn, toogleVisible } = usePokemonGame()

  return (
    <>
      <div class="cursor-pointer" onClick$={goToPokemon}>
        <PokemonImage id={pokemonId.value} pokeType={pokeType.value} show={isPokemonVisible.value} />
      </div>
      <NavigationCounter onChange={onChange} />
      <button
        id="turnButton"
        onClick$={toogleTurn}
        class="btn btn-primary mt-2"
      >
        Turn
      </button>

      <button
        id="turnButton"
        onClick$={toogleVisible}
        class="btn btn-primary mt-2"
      >
        isPokemonVisible
      </button>

    </>
  );
});

export const head: DocumentHead = {
  title: 'Pokemons - L',
  meta: [
    {
      name: 'description',
      content: 'Site description',
    },
  ],
};
