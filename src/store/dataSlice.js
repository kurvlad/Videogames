export const _API_KEY = "7a1d1d91a97a4b9baf303ed485650f74";

const initialStateUser = {
  isLoading: false,
  currentItem: null,
  items: null,
  itemsCount: 0,
  error: null,
  searchList: null,
  searchCount: 0,
  genres: null,
  platforms: null,
  stores: null,
};

export const fetchItems = (page_size = 3, page = 1) => dispatch => {
  dispatch({type: 'fetch/items/loading'});
  fetch(`https://api.rawg.io/api/games?key=${_API_KEY}&page=${page}&page_size=${page_size}`)
      .then((res) => res.json())
      .then((data) =>
          dispatch({ type: "fetch/items/loaded", payload: data })
      )
      .catch((err) => {
        console.warn(err);
        dispatch({
          type: "fetch/error",
          payload: "Проблемы с получением списка игр",
        });
      });
};

export const fetchItem = (id) => (dispatch, getState) => {
  fetch(`https://api.rawg.io/api/games/${id}?key=${_API_KEY}`)
      .then((res) => res.json())
      .then((res) => dispatch({ type: "fetch/item/loaded", payload: res }))
      .catch((err) => {
        console.warn(err);
        dispatch({ type: "fetch/error", payload: "Проблемы с получением игры" });
      });
};
// base string for searching games by name
// https://api.rawg.io/docs/#operation/games_list - more options
export const fetchSearchItems = (searchParams, page_size = 6, page = 1) => (dispatch, getState) => {
  const name = searchParams.has('name') ? "&search=" + searchParams.get('name') : "";
  const order = searchParams.has('order') ? "&ordering=" + searchParams.get('order') : "";
  const genres = searchParams.has('genres') ? "&genres=" + searchParams.get('genres') : "";
  const platforms = searchParams.has('platforms') ? "&platforms=" + searchParams.get('platforms') : "";
  const stores = searchParams.has('stores') ? "&stores=" + searchParams.get('stores') : "";
  // name, released, added, created, updated, rating, metacritic if need reversed just add "-" (like: -updated)

  const url = `https://api.rawg.io/api/games?key=${_API_KEY}&page=${page}&page_size=${page_size}`
      + name + order + genres + platforms + stores;
  fetch(url)
      .then((res) => res.json())
      .then((res) => dispatch({ type: "fetch/search/loaded", payload: res }))
      .catch((err) => {
        console.warn(err);
        dispatch({ type: "fetch/error", payload: "Проблемы с получением игры" });
      });
};

export const updFavorite = (id) => {
  return {
    type: "upd/items/favorite",
    payload: id
  }
}

export function dataReducer(state = initialStateUser, action) {
  switch (action.type) {
    case 'fetch/items/loading':
      return {
        ...state,
        isLoading: true
      };
    case "fetch/items/loaded":
      return {
        ...state,
        isLoading: false,
        items: action.payload.results,
        itemsCount: action.payload.count
      };
    case "fetch/item/loaded":
      return {
        ...state,
        currentItem: action.payload,
      };
    case "fetch/search/loaded":
      return {
        ...state,
        searchList: action.payload.results,
        searchCount: action.payload.count
      };
    case "item/clear":
      return {
        ...state,
        currentItem: null,
      };
    case "fetch/error": {
      return {
        ...state,
        error: action.payload,
      };
    }
    case "genres/loaded":
      return {
        ...state,
        genres: action.payload,
      };
    case "platforms/loaded":
      return {
        ...state,
        platforms: action.payload,
      };
    case "stores/loaded":
      return {
        ...state,
        stores: action.payload,
      };
    case "upd/items/favorite": {
      let upd = null;
      if(state.items && state.items.length > 0){
        upd = state.items.map(el => {
          if (el.id === action.payload) return { ...el, favorite: !el.favorite }
          else return el
        })
      }
      return {
        ...state,
        items: upd
      }
    }
    default:
      return state;
  }
}
