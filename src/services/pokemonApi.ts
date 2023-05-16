import axios from "axios"
import { Pokemon } from "~/interfaces/pokemon"
import { PokemonResults } from "~/interfaces/pokemons"
import { getFinalNumberFromUrl } from "~/utils/get-number-from-url"
import { PokeImageUrl } from "~/utils/get-poke-image"

const baseUrl = `https://pokeapi.co/api/v2`
export const getPokemoById = async ({ id }: { id: number | string }) => {
    const response = await axios.get<Pokemon>(`${baseUrl}/pokemon/${id}`)


    return response.data
}

interface PokeParams {
    limit?: number,
    offset?: number
}
export const getPokemoms = async (pokeParams: PokeParams) => {
    const response = await axios.get<PokemonResults>(`${baseUrl}/pokemon`, { params: pokeParams })
    response.data.results = response.data.results.map((poke) => {
        return { ...poke, imageUrl: PokeImageUrl({ id: getFinalNumberFromUrl(poke.url) }) }
    })
    return response.data
}


