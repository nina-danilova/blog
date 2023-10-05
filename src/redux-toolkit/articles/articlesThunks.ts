import { createAsyncThunk } from '@reduxjs/toolkit';

import { ArticlesWithId, getArticles } from 'services/blog-service';
import { ServiceError } from 'utilities/errors';
import { getLoginToken } from 'services/storage-service';

type LoadArticlesPayloadProps = {
  currentPage: number;
};

export const loadArticles = createAsyncThunk<
  ArticlesWithId,
  LoadArticlesPayloadProps,
  { rejectValue: ServiceError | unknown }
>('articles/loadArticles', async ({ currentPage }, { rejectWithValue }) => {
  const token = getLoginToken();
  try {
    return await getArticles({ currentPage, token });
  } catch (error) {
    return rejectWithValue(error);
  }
});
