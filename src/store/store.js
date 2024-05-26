import { combineReducers, createStore, applyMiddleware } from "redux";
import { userReducer } from "./userSlice";
import { historyReducer } from "./historySlice";
import { favoriteReducer } from "./favoriteSlice";
import { dataReducer } from "./dataSlice";
import asyncFunctionMiddleware from "./middleware";

export const rootReducer = combineReducers({
    user: userReducer,
    favorites: favoriteReducer,
    history: historyReducer,
    data: dataReducer
});


const middlewareEnhancer = applyMiddleware(asyncFunctionMiddleware);

export const store = createStore(rootReducer, middlewareEnhancer);
