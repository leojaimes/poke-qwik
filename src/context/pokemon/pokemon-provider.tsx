import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { PokemonGameContext, type PokemonGameState } from "./pokemon-game.context";
import { PokeType } from "~/utils/get-poke-image";
import type { PokemonListPageState } from "./pokemon-list.context";
import { PokemonListContext } from "./pokemon-list.context";

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
        if (localStorage.getItem('pokemonGame')) {
            console.log(localStorage.getItem('pokemonGame'))
            const { isPokemonVisible = true, pokeType = PokeType.default, pokemonId = 10 }
                = JSON.parse(localStorage.getItem('pokemonGame')!) as PokemonGameState
            pokemonGame.isPokemonVisible = isPokemonVisible;
            pokemonGame.pokeType = pokeType;
            pokemonGame.pokemonId = pokemonId;
        }
    })

    useVisibleTask$(({ track }) => {
        track(() => [pokemonGame.isPokemonVisible, pokemonGame.pokemonId, pokemonGame.pokeType])
        console.log('visible task 2 ' + pokemonGame.pokeType)
        localStorage.setItem('pokemonGame', JSON.stringify({ ...pokemonGame }))
    })

    return <Slot />
});