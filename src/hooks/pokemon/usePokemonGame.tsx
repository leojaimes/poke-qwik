import { useContext, $ } from '@builder.io/qwik';
import { useNavigate } from "@builder.io/qwik-city"
import { PokemonGameContext } from "~/context"
import { PokeType } from '~/utils/get-poke-image';


export const usePokemonGame = () => {
    const nav = useNavigate()
    const pokeGameContext = useContext(PokemonGameContext)


    const toogleTurn = $(() => {
        pokeGameContext.pokeType === PokeType.default ? pokeGameContext.pokeType = PokeType.backShiny : pokeGameContext.pokeType = PokeType.default
    })

    const goToPokemon = $(async () => {
        await nav(`/pokemon/${pokeGameContext.pokemonId}`)
    })
    const onChange = $((number: number) => { pokeGameContext.pokemonId += number; console.log(` fun:::: ${pokeGameContext.pokemonId} `) })

    return {
        toogleTurn,
        goToPokemon,
        onChange,
        pokeGameContext

    }
} 