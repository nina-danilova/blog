import { createAsyncThunk } from '@reduxjs/toolkit';

import { getData } from 'services/api';
import { apiBaseUrl, linkPaths } from 'utilities/constants';
import { createError } from 'utilities/errors';

import { Article } from './articleSlice';

type LoadArticlePayloadProps = {
  id: string;
  history;
};

type LoadArticleRejectValue = {
  name: string;
  message: string;
  body?: Error;
};

export const loadArticle = createAsyncThunk<Article, LoadArticlePayloadProps, { rejectValue: LoadArticleRejectValue }>(
  'articles/loadArticle',
  async ({ id, history }, { rejectWithValue }) => {
    const { pathToSignIn } = linkPaths;
    return getData(`${apiBaseUrl}/articles/${id}`)
      .then(
        (response) => {
          if (response.status === 401) {
            history.push(pathToSignIn);
          } else if ((response.status >= 200 && response.status < 300) || response.status === 422) {
            return response.json();
          }
          throw createError(`Load article error, code ${response.status.toString()} - error after API answer`);
        },
        (err) => {
          throw createError('Load article error while sending data through API', err);
        }
      )
      .then((response) => {
        if (response.errors) {
          const errors = Object.entries(response.errors);
          const [errorName, errorMessage] = errors[0];
          throw createError(`Load article error - ${errorName} ${errorMessage}`);
        }
        if (response.article) {
          return response.article;
        }
        throw createError('Unknown error of loading article');
      })
      .catch((error) => {
        if (error.message) {
          return rejectWithValue(error);
        }
        const err = createError(error);
        return rejectWithValue(err);
      });
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
