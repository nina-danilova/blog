import { createAsyncThunk } from '@reduxjs/toolkit';

import { ArticlesWithId, getArticles } from 'services/blog-service';
import { ServiceError } from 'utilities/errors';

type LoadArticlesPayloadProps = {
  currentPage: number;
};

export const loadArticles = createAsyncThunk<
  ArticlesWithId,
  LoadArticlesPayloadProps,
  { rejectValue: ServiceError | unknown }
>('articles/loadArticles', async ({ currentPage }, { rejectWithValue }) => {
  try {
    return await getArticles(currentPage);
  } catch (error) {
    return rejectWithValue(error);
  }
});
