import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movieListData: []
}

export const movieListSlice = createSlice({
    name: "movieList",
    initialState,
    reducers: {
        setMovieListData: (state, action) => {
            state.movieListData = action.payload;
        },
    },
})

export const { movieListData, setMovieListData } =
    movieListSlice.actions;

export default movieListSlice.reducer;