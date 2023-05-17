import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { PokemonGameContext, PokemonGameState } from "./pokemon-game.context";
import { PokeType } from "~/utils/get-poke-image";
import { PokemonListContext, PokemonListPageState } from "./pokemon-list.context";

export const PokemonProvider = component$(() => {
    const pokemonGame = useStore<PokemonGameState>({
        pokemonId: 4,
        isPokemonVisible: false,
        pokeType: PokeType.default
    })

    const pokemonListStore = useStore<PokemonListPageState>({
        pokemons: [],
        offset: 0,
        isLoading: false,
    })

    useContextProvider(PokemonGameContext, pokemonGame)
    useContextProvider(PokemonListContext, pokemonListStore)
    useVisibleTask$(() => {
        console.log('visible task 1')
    })

    useVisibleTask$(() => {
        console.log('visible task 2')
    })

    return <Slot />
});