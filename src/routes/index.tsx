import { component$, useSignal, $, useContext } from '@builder.io/qwik';
import { DocumentHead, Link, useContent, useNavigate } from '@builder.io/qwik-city';
import { NavigationCounter } from '~/components/pokemons/navigation-counter';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { useNavigation } from '~/components/pokemons/useNavigation';
import { PokemonGameContext } from '~/context';
import { usePokemonGame } from '~/hooks/pokemon/usePokemonGame';
import { PokeType } from '~/utils/get-poke-image';


export default component$(() => {
  const { pokeGameContext, onChange, goToPokemon, toogleTurn } = usePokemonGame()

  return (
    <>
      <div class="cursor-pointer" onClick$={goToPokemon}>
        <PokemonImage id={pokeGameContext.pokemonId} pokeType={pokeGameContext.pokeType} show={pokeGameContext.isPokemonVisible} />
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
        onClick$={() => { pokeGameContext.isPokemonVisible = !pokeGameContext.isPokemonVisible }}
        class="btn btn-primary mt-2"
      >
        isPokemonVisible
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
