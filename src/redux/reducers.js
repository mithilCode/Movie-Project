import { combineReducers } from "@reduxjs/toolkit";
import movieList from "./reducers/movieList.slice";
export default function createReducer(injectedReducers) {
    return combineReducers({
        ...injectedReducers,
        movieList
    })
}