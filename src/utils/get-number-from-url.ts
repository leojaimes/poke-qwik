// const url = "https://pokeapi.co/api/v2/pokemon/53/";
// const slashIndex = url.lastIndexOf("/");
// const number = url.substring(slashIndex + 1);

export const getFinalNumberFromUrl = (url: string) => {
    const number = url.split("/").filter(Boolean).pop();
    return Number(number)
}