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
    isFollowing: boolean;
  };
};

type ArticleSliceState = {
  isLoading: boolean;
  isSending: boolean;
  isEditing: boolean;
  isDeleting: boolean;
  isUpdating: boolean;
  error: null | ServiceError;
  article: null | Article;
  slug: null | string;
};

const initialState: ArticleSliceState = {
  isLoading: false,
  isSending: false,
  isEditing: false,
  isUpdating: false,
  isDeleting: false,
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
      state.isEditing = action.payload;
    },
    clearArticle: (state) => {
      state.article = null;
    },
    setLikeToViewingArticle: (state, action: PayloadAction<Article>) => {
      state.article = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadArticle.pending, (state) => {
        state.isLoading = true;
        state.article = null;
        state.error = null;
      })
      .addCase(loadArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.article = action.payload;
        state.error = null;
      })
      .addCase(createArticle.pending, (state) => {
        state.isSending = true;
        state.error = null;
      })
      .addCase(createArticle.fulfilled, (state) => {
        state.isSending = false;
        state.error = null;
      })
      .addCase(updateArticle.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateArticle.fulfilled, (state) => {
        state.isUpdating = false;
        state.error = null;
      })
      .addCase(deleteArticle.pending, (state) => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteArticle.fulfilled, (state) => {
        state.isDeleting = false;
        state.error = null;
      })
      .addMatcher(isError, (state, action: PayloadAction<ServiceError>) => {
        state.isLoading = false;
        state.isSending = false;
        state.isUpdating = false;
        state.isDeleting = false;
        state.error = action.payload;
      });
  },
});

export const articleSLiceReducer = articleSlice.reducer;
export const { setSlug, setEditStatus, clearArticle, setLikeToViewingArticle } = articleSlice.actions;
