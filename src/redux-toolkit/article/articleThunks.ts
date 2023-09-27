import { createAsyncThunk } from '@reduxjs/toolkit';

import { getArticle } from 'services/blog-service';
import { ServiceError } from 'utilities/errors';

import { Article } from './articleSlice';

type LoadArticlePayloadProps = {
  id: string;
};

export const loadArticle = createAsyncThunk<Article, LoadArticlePayloadProps, { rejectValue: ServiceError | unknown }>(
  'articles/loadArticle',
  async ({ id }, { rejectWithValue }) => {
    try {
      return await getArticle(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createArticle = ({ event, history, data }) => {
  console.log(event, history, data);
  return {
    type: 'CREATE_ARTICLE',
    event,
    history,
    data,
  };
};
