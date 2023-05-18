import { component$, useComputed$, useStore, $, useVisibleTask$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { ShortPokemonData } from '~/interfaces/pokemons';
import { getPokemoms } from '~/services/pokemonApi';


interface PokemonPageState {
    pokemons: ShortPokemonData[];
    offset: number;
}

export function usePokemonPageState(initialPokeState: PokemonPageState) {
    const initialPokemons = initialPokeState.pokemons
    const initialOffset = initialPokeState.offset

    const pokemonState = useStore<PokemonPageState>({
        pokemons: initialPokemons,
        offset: initialOffset,
    });

    useVisibleTask$(async ({ cleanup, track }) => {
        console.log('hola mundo')
        track(() => pokemonState.offset)
        const res = await getPokemoms({
            limit: 10,
            offset: pokemonState.offset
        })
        pokemonState.pokemons = res.results
    })

    const changeOffset = $(async (value: number) => {
        if (pokemonState.offset + value <= 0) {
            return;
        }
        pokemonState.offset += value;
    });

    return { offset: pokemonState.offset, pokemons: pokemonState.pokemons, changeOffset };
}

