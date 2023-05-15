import { component$,   } from "@builder.io/qwik";
import { PokeImageUrl } from "~/utils/get-poke-image";

export const PokemonImage = component$(( { value } : { value: number }) => {


  return (
    <>
      <img
        src={PokeImageUrl(value)}
        alt="mew"
        height={100}
        width={100}
        style={{ width: "100px", height: "100px" }}
      />
    
    </>
  );
});

const NavigationImage  = component$(()=> {
    return (
        <> 
        <div class="mt-2">
        <button
          onClick$={() => {
            changePokemonId(-1);
          }}
          class="btn btn-primary mr-2 "
        >
          Previous
        </button>
        <button
          onClick$={() => {
            changePokemonId(-1)
          }}
          class="btn btn-primary"
        >
          Next
        </button>
      </div>
      </>
    )
})
