export function getDTO(array){
    const genresArray= [];
    for(const el of array){
        genresArray.push(el.name);
    }
    return genresArray;
}
