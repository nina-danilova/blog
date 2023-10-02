import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ServiceError } from 'utilities/errors';

import { createArticle, deleteArticle, loadArticle, updateArticle } from './articleThunks';

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
  sending: boolean;
  editing: boolean;
  deleting: boolean;
  updating: boolean;
  error: null | ServiceError;
  article: null | Article;
  slug: null | string;
};

const initialState: ArticleSliceState = {
  loading: false,
  sending: false,
  editing: false,
  updating: false,
  deleting: false,
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
    setEditStatus: (state, action: PayloadAction<boolean>) => {
      state.editing = action.payload;
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
      .addCase(createArticle.pending, (state) => {
        state.sending = true;
        state.error = null;
      })
      .addCase(createArticle.fulfilled, (state) => {
        state.sending = false;
      })
      .addCase(updateArticle.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateArticle.fulfilled, (state) => {
        state.updating = false;
      })
      .addCase(deleteArticle.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteArticle.fulfilled, (state) => {
        state.deleting = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<ServiceError>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const articleSLiceReducer = articleSlice.reducer;
export const { setSlug, setEditStatus } = articleSlice.actions;
