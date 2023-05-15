import { component$,   } from "@builder.io/qwik";
import { PokeImageUrl, PokeType } from "~/utils/get-poke-image";

interface Props {
    id: number;
    size?: number;
}
export const PokemonImage = component$(( { id, size = 100 } : Props ) => {
  return (
    <>
      <img
        src={PokeImageUrl({id, pokeType: PokeType.shiny})}
        alt="mew"
        height={size}
        width={size}
        style={{ width: "100px", height: "100px" }}
      />
    
    </>
  );
});

