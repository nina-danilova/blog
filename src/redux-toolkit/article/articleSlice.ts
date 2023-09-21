import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { isError } from 'utilities/checks';

import { loadArticle } from './articleThunks';

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
  id: number;
};

type ArticleStateError = {
  name: string;
  message: string;
};

type ArticleSliceState = {
  loading: boolean;
  error: null | ArticleStateError;
  article: null | Article;
  slug: string;
};

const initialState: ArticleSliceState = {
  loading: false,
  error: null,
  article: null,
  slug: 'If-we-quantify-the-alarm-we-can-get-to-the-FTP-pixel-through-the-online-SSL-interface!-120863',
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
      .addMatcher(isError, (state, action: PayloadAction<ArticleStateError>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const articleSLiceReducer = articleSlice.reducer;
export const { setSlug } = articleSlice.actions;
