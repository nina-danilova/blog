import { createSlice } from '@reduxjs/toolkit';

import { loadArticle } from './articleThunks';

const articleSlice = createSlice({
  name: 'viewingArticle',
  initialState: {
    loading: false,
    error: null,
    article: null,
    slug: 'If-we-quantify-the-alarm-we-can-get-to-the-FTP-pixel-through-the-online-SSL-interface!-120863',
  },
  reducers: {
    setSlug: (state, action) => {
      state.slug = action.payload;
    },
  },
  extraReducers: {
    [loadArticle.pending]: (state) => {
      state.loading = true;
      state.article = null;
      state.error = null;
    },
    [loadArticle.fulfilled]: (state, action) => {
      state.loading = false;
      state.article = action.payload.article;
    },
    [loadArticle.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const articleSLiceReducer = articleSlice.reducer;
export const { setSlug } = articleSlice.actions;
