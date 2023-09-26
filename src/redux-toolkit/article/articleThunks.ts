import { createAsyncThunk } from '@reduxjs/toolkit';

import { getArticle } from 'services/blog-service';

import { Article } from './articleSlice';

type LoadArticlePayloadProps = {
  id: string;
};

type LoadArticleRejectValue = {
  name: string;
  message: string;
  body?: Error | Response;
};

const isResError = (res: Article | Error): res is Error => {
  return !!res.cause;
};

export const loadArticle = createAsyncThunk<Article, LoadArticlePayloadProps, { rejectValue: LoadArticleRejectValue }>(
  'articles/loadArticle',
  async ({ id }, { rejectWithValue }) => {
    const result = await getArticle(id);
    if (isResError(result)) {
      return rejectWithValue(result);
    }
    return result;
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
