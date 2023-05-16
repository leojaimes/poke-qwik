import axios from "axios"
import { Pokemon } from "~/interfaces/pokemon"
import { PokemonResults } from "~/interfaces/pokemons"

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
    return response.data
}


