import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Article } from 'redux-toolkit/article/articleSlice';

import { loadArticles } from './articlesThunks';

const isError = (action: AnyAction) => {
  return action.type.endsWith('loadArticles/rejected');
};

type ArticleList = Article[];

type ArticlesSliceState = {
  loading: boolean;
  error: null | Error;
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
  extraReducers: (builder) => {
    builder
      .addCase(loadArticles.pending, (state) => {
        state.loading = true;
        state.articleList = [];
        state.error = null;
      })
      .addCase(loadArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articleList = action.payload.articles;
        state.articlesCount = action.payload.articlesCount;
      })
      .addMatcher(isError, (state, action: PayloadAction<Error>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const articlesSliceReducer = articlesSlice.reducer;
export const { changeCurrentPage } = articlesSlice.actions;
