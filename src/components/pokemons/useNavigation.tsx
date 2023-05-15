import { useSignal, $ } from '@builder.io/qwik';

export const useNavigation = () => {
    const pokemonId = useSignal<number>(1);
    const changePokemonId = $((value: number) => {
       
      if (pokemonId.value + value <= 0) {
        return;
      }
      pokemonId.value +=   value;
      console.log(  'pokemonId.value '+  pokemonId.value)
    });

    return {
        pokemonId,
        value: pokemonId.value,
        changePokemonId
    }
}