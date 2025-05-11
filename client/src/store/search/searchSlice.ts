import { createSlice } from "@reduxjs/toolkit";

interface SearchState {
  searchQuery: string;
}

const initialState: SearchState = {
  searchQuery: ""
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateSearch: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export default searchSlice.reducer;
export const { updateSearch } = searchSlice.actions;