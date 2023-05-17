import { component$, Slot, useContextProvider, useStore, useStyles$ } from '@builder.io/qwik';
import { Navbar } from '~/components/shared/navbar/navbar';
import styles from './styles.css?inline';
import { PokemonGameContext, PokemonGameState } from '~/context';
import { PokeType } from '../utils/get-poke-image';



export default component$(() => {
  useStyles$(styles);
  const pokemonGame = useStore<PokemonGameState>({
    pokemonId: 4,
    isPokemonVisible: false,
    pokeType: PokeType.default
  })

  useContextProvider(PokemonGameContext, pokemonGame)
  return (
    <>
      <Navbar />
      <main class="flex flex-col items-center justify-center">
        <Slot />
      </main>

    </>
  );
});
