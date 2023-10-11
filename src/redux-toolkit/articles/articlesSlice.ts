import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Article } from 'redux-toolkit/article/articleSlice';
import { ServiceError } from 'utilities/errors';

import { loadArticles } from './articlesThunks';

const isError = (action: AnyAction) => {
  return action.type.endsWith('loadArticles/rejected');
};

export type ArticleList = Article[];

type ArticlesSliceState = {
  isLoading: boolean;
  error: null | ServiceError;
  articleList: ArticleList;
  articlesCount: number;
  currentPage: number;
};

const initialState: ArticlesSliceState = {
  isLoading: false,
  error: null,
  articleList: [],
  articlesCount: 0,
  currentPage: 1,
};

type SetLikeProps = {
  isLiked: boolean;
  index: number;
  counter: number;
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    changeCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setLikeToArticle: (state, action: PayloadAction<SetLikeProps>) => {
      state.articleList[action.payload.index].favorited = action.payload.isLiked;
      state.articleList[action.payload.index].favoritesCount += action.payload.counter;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadArticles.pending, (state) => {
        state.isLoading = true;
        state.articleList = [];
        state.error = null;
      })
      .addCase(loadArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articleList = action.payload.articles;
        state.articlesCount = action.payload.articlesCount;
        state.error = null;
      })
      .addMatcher(isError, (state, action: PayloadAction<ServiceError>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const articlesSliceReducer = articlesSlice.reducer;
export const { changeCurrentPage, setLikeToArticle } = articlesSlice.actions;
