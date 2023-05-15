
const baseUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon`


export enum PokeType {
    default = '',
    back ='back/',
    shiny ='shiny/',
    backShiny ='back/shiny/'
}



export const  PokeImageUrl = ({ id, pokeType = PokeType.default }: { id: number, pokeType?: PokeType   } )=>(`${baseUrl}/${pokeType}${id}.png`)

