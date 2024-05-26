/*-- FAVORITES --*/

// Initial state:
const initialFavorites = [];

// Action creators:

export function addFavorite(newItem) {
    return {
        type: "favorites/add",
        payload: { id: newItem.id, name: newItem.name, slug: newItem.slug, rating_top: newItem.rating_top, background_image: newItem.background_image, favorite: true },
    };
}

export function setFavorites(items) {
    return {
        type: "favorites/set",
        payload: items
    }
}

export function removeFavorite(id) {
    return {
        type: "favorites/remove",
        payload: id,
    };
}

// Reducer:
export function favoriteReducer(state = initialFavorites, action) {
    switch (action.type) {
        case "favorites/add":
            return [...state, action.payload];
        case "favorites/set":
            return action.payload;
        case "favorites/remove":
            return [...state.filter((el) => el.id !== action.payload)];
        default:
            return state;
    }
}
