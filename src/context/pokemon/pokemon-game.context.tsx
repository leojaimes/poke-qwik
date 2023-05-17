import { createContextId } from "@builder.io/qwik";
import { PokeType } from "~/utils/get-poke-image";

export interface PokemonGameState {
    pokemonId: number;
    pokeType: PokeType;
    isPokemonVisible: boolean;
}

export const PokemonGameContext = createContextId<PokemonGameState>('pokemon.game.context')