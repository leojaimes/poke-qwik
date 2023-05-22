import { createContextId } from "@builder.io/qwik";
import { type PokeType } from "~/utils/get-poke-image";

export interface PokemonGameState {
    pokemonId: number;
    pokeType: PokeType;
    isPokemonVisible: boolean;
}

export const PokemonGameContext = createContextId<PokemonGameState>('pokemon.game.context')