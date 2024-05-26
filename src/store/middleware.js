import { setUserFavorites, setUserHistory } from "../utils/dataStorage/user"

const asyncFunctionMiddleware = storeAPI => next => action => {
    // If the "action" is actually a function instead...
    if (typeof action === 'function') {
        // then call the function and pass `dispatch` and `getState` as arguments
        return action(storeAPI.dispatch, storeAPI.getState)
    }
    if (action.type.includes('history')) {
        next(action) // upd store
        return setUserHistory(storeAPI.getState().history); //sync store with localSorage
    }
    if (action.type.includes('favorites')) {
        next(action)
        return setUserFavorites(storeAPI.getState().favorites);
    }

    // Otherwise, it's a normal action - send it onwards
    return next(action);
}

export default asyncFunctionMiddleware;