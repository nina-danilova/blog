import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Article } from 'redux-toolkit/article/articleSlice';

import { loadArticles } from './articlesThunks';

type ArticlesStateError = {
  name: string;
  message: string;
};

type ArticleList = Article[];

type ArticlesSliceState = {
  loading: boolean;
  error: null | ArticlesStateError;
  articleList: ArticleList;
  articlesCount: number;
  currentPage: number;
};

const initialState: ArticlesSliceState = {
  loading: false,
  error: null,
  articleList: [],
  articlesCount: 0,
  currentPage: 1,
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    changeCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: {
    [loadArticles.pending]: (state) => {
      state.loading = true;
      state.articleList = [];
      state.error = null;
    },
    [loadArticles.fulfilled]: (state, action: PayloadAction<{ articles: ArticleList; articlesCount: number }>) => {
      state.loading = false;
      state.articleList = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
    },
    [loadArticles.rejected]: (state, action: PayloadAction<ArticlesStateError>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const articlesSliceReducer = articlesSlice.reducer;
export const { changeCurrentPage } = articlesSlice.actions;
