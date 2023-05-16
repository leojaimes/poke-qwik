import { component$, useSignal, $ } from '@builder.io/qwik';
import { DocumentHead, Link, useNavigate } from '@builder.io/qwik-city';
import { NavigationCounter } from '~/components/pokemons/navigation-counter';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { useNavigation } from '~/components/pokemons/useNavigation';
import { PokeType } from '~/utils/get-poke-image';


export default component$(() => {
  const isPokemonVisible = useSignal<boolean>(false);
  const pokeType = useSignal<PokeType>(PokeType.default);
  const { pokemonId, changePokemonId } = useNavigation()
  const nav = useNavigate()

  const toogleTurn = $(() => {
    pokeType.value === PokeType.default ? pokeType.value = PokeType.backShiny : pokeType.value = PokeType.default
  })

  const goToPokemon = $(async () => {
    await nav(`/pokemon/${pokemonId.value}`)
  })


  return (
    <>
      <div class="cursor-pointer" onClick$={goToPokemon}>
        <PokemonImage id={pokemonId.value} pokeType={pokeType.value} show={isPokemonVisible.value} />
      </div>
      <NavigationCounter onChange={changePokemonId} />
      <button
        id="turnButton"
        onClick$={toogleTurn}
        class="btn btn-primary mt-2"
      >
        Turn
      </button>

      <button
        id="turnButton"
        onClick$={() => { isPokemonVisible.value = !isPokemonVisible.value }}
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
