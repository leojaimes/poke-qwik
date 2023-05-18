import { component$, useContext } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { RedirectMessage } from '@builder.io/qwik-city/middleware/request-handler';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context/pokemon/pokemon-game.context';
import { usePokemonGame } from '~/hooks/pokemon/usePokemonGame';
import { Pokemon } from '~/interfaces/pokemon';
import { getPokemoById } from '~/services/pokemonApi';

interface PokemonIdReturn {
    id: number | string;
    pokemon: Pokemon;

}
export const usePokemonId = routeLoader$<PokemonIdReturn | undefined>(async ({ params, redirect }) => {
    let res: Pokemon | undefined;
    try {
        res = await getPokemoById({ id: params.id });
    } catch (error) {
        // Manejo del error
    }

    if (!res) {
        redirect(301, '/');
        return
    }

    return {
        id: params.id,
        pokemon: res
    } as PokemonIdReturn;
});

export default component$(() => {
    //const loc = useLocation();
    //console.log({ loc: loc.params.id })
    const { value: { pokemon, id } = {} } = usePokemonId();
    //const pokeGameContext = useContext(PokemonGameContext)
    const { pokemonId, pokeType, isPokemonVisible, toogleTurn, toogleVisible } = usePokemonGame()

    if (!id || !pokemon) {
        return (<h1>Not Found</h1>)
    }

    return (
        <>
            <span class="text-5xl capitalize">
                {pokemon?.name}
            </span>
            <PokemonImage id={id} pokeType={pokeType.value} show={isPokemonVisible.value} />

            <button
                id="turnButton"
                onClick$={toogleTurn}
                class="btn btn-primary mt-2"
            >
                Turn
            </button>

            <button
                id="turnButton"
                onClick$={toogleVisible}
                class="btn btn-primary mt-2"
            >
                isPokemonVisible
            </button>

        </>
    )
});