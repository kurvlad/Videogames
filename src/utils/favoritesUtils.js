export const checkFav = (itemId, snapshot) => {
    const exist = snapshot.some(el => el.id === itemId);
    return exist;
}