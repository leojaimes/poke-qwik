import { component$, useSignal, useTask$, } from '@builder.io/qwik';
import { PokeImageUrl, PokeType } from "~/utils/get-poke-image";

interface Props {
  id: number | string;
  size?: number;
  pokeType?: PokeType;
  show?: boolean;
}
export const PokemonImage = component$(
  ({ id, size = 100, pokeType = PokeType.default, show = false }: Props) => {
    const imageLoaded = useSignal(false);
    useTask$(({ track }) => {
      track(() => id)

      imageLoaded.value = false

    })

    // const imageUrl = useComputed$(() => {

    //   return PokeImageUrl({ id, pokeType: pokeType })
    // })

    return (
      <div
        class="flex items-center justify-center"
        style={{ width: `${size}`, height: `${size}px` }}
      >
        {!imageLoaded && <span>Loading...</span>}

        <img
          src={PokeImageUrl({ id, pokeType: pokeType })}
          alt="mew"
          height={size}
          width={size}
          style={{ width: `${size}px`, height: `${size}px` }}
          onLoad$={() => {
            setTimeout(() => {
              imageLoaded.value = true
            }, 200)

          }}
          class={[{
            'hidden': !imageLoaded.value,
            'brightness-0': !show,
          }, 'transition-all']}
        />

      </div>
    );
  }
);
