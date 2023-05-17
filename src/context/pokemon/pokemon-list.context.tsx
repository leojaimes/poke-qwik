import { createContextId } from "@builder.io/qwik";
import { ShortPokemonData } from "~/interfaces/pokemons";


export interface PokemonListPageState {
    pokemons: ShortPokemonData[];
    offset: number;
    isLoading: boolean
}

export const PokemonListContext = createContextId<PokemonListPageState>('pokemon-list.page')