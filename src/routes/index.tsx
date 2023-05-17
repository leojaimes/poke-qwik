import { component$, useSignal, $, useContext } from '@builder.io/qwik';
import { DocumentHead, Link, useContent, useNavigate } from '@builder.io/qwik-city';
import { NavigationCounter } from '~/components/pokemons/navigation-counter';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { useNavigation } from '~/components/pokemons/useNavigation';
import { PokemonGameContext } from '~/context';
import { PokeType } from '~/utils/get-poke-image';


export default component$(() => {
  // const isPokemonVisible = useSignal<boolean>(false);
  // const pokeType = useSignal<PokeType>(PokeType.default);
  // const { pokemonId, changePokemonId } = useNavigation()

  const pokeGameContext = useContext(PokemonGameContext)
  const nav = useNavigate()

  const toogleTurn = $(() => {
    pokeGameContext.pokeType === PokeType.default ? pokeGameContext.pokeType = PokeType.backShiny : pokeGameContext.pokeType = PokeType.default
  })

  const goToPokemon = $(async () => {
    await nav(`/pokemon/${pokeGameContext.pokemonId}`)
  })


  return (
    <>
      <div class="cursor-pointer" onClick$={goToPokemon}>
        <PokemonImage id={pokeGameContext.pokemonId} pokeType={pokeGameContext.pokeType} show={pokeGameContext.isPokemonVisible} />
      </div>
      <NavigationCounter onChange={$((number: number) => { pokeGameContext.pokemonId += number; console.log(` fun:::: ${pokeGameContext.pokemonId} `) })} />
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
