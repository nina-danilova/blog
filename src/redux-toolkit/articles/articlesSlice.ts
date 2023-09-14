import { createSlice } from '@reduxjs/toolkit';

import { loadArticles } from './articlesThunks';

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    loading: false,
    error: null,
    articleList: [],
    articlesCount: 0,
    currentPage: 1,
  },
  reducers: {
    changeCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: {
    [loadArticles.pending]: (state) => {
      state.loading = true;
      state.articleList = [];
      state.error = null;
    },
    [loadArticles.fulfilled]: (state, action) => {
      state.loading = false;
      state.articleList = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
    },
    [loadArticles.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const articlesSliceReducer = articlesSlice.reducer;
export const { changeCurrentPage } = articlesSlice.actions;
