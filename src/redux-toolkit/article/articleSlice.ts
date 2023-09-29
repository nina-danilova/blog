import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ServiceError } from 'utilities/errors';

import { loadArticle } from './articleThunks';

const isError = (action: AnyAction) => {
  return action.type.endsWith('Article/rejected');
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tagList: string[];
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    image: string;
    following: boolean;
  };
};

type ArticleSliceState = {
  loading: boolean;
  error: null | ServiceError;
  article: null | Article;
  slug: null | string;
};

const initialState: ArticleSliceState = {
  loading: false,
  error: null,
  article: null,
  slug: null,
};

const articleSlice = createSlice({
  name: 'viewingArticle',
  initialState,
  reducers: {
    setSlug: (state, action: PayloadAction<string>) => {
      state.slug = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadArticle.pending, (state) => {
        state.loading = true;
        state.article = null;
        state.error = null;
      })
      .addCase(loadArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.article = action.payload;
      })
      .addMatcher(isError, (state, action: PayloadAction<ServiceError>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const articleSLiceReducer = articleSlice.reducer;
export const { setSlug } = articleSlice.actions;
