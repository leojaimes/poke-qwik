export interface PokemonResults {
    count: number;
    next: string;
    previous: null;
    results: ShortPokemonData[];
}

export interface ShortPokemonData {
    name: string;
    url: string;
}