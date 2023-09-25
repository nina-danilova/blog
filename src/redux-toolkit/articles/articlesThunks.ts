import { createAsyncThunk } from '@reduxjs/toolkit';

import { getData } from 'services/api';
import { apiBaseUrl, linkPaths } from 'utilities/constants';
import { Article } from 'redux-toolkit/article/articleSlice';
import { createError } from 'utilities/errors';

const addIdToArticles = (articleList: Article[]): (Article & { id: number })[] => {
  let id = 0;
  return articleList.map((article) => {
    const articleWithId = { ...article, id };
    id += 1;
    return articleWithId;
  });
};

const getOffset = (page: number): number => {
  return (page - 1) * 20;
};

type LoadArticlesPayloadProps = {
  currentPage: number;
  history;
};

type LoadArticlesRejectValue = {
  name: string;
  message: string;
  body?: Error;
};

export const loadArticles = createAsyncThunk<
  {
    articles: Article[];
    articlesCount: number;
  },
  LoadArticlesPayloadProps,
  { rejectValue: LoadArticlesRejectValue }
>('articles/loadArticles', async ({ currentPage, history }, { rejectWithValue }) => {
  const offset = getOffset(currentPage);
  const { pathToSignIn } = linkPaths;
  return getData(`${apiBaseUrl}/articles?limit=20&offset=${offset}`)
    .then(
      (response) => {
        if (response.status === 401) {
          history.push(pathToSignIn);
        } else if ((response.status >= 200 && response.status < 300) || response.status === 422) {
          return response.json();
        }
        throw createError(`Load articles error, code ${response.status.toString()} - error after API answer`);
      },
      (err) => {
        throw createError('Load articles error while sending data through API', err);
      }
    )
    .then((response) => {
      if (response.errors) {
        const errors = Object.entries(response.errors);
        const [errorName, errorMessage] = errors[0];
        throw createError(`Load articles error - ${errorName} ${errorMessage}`);
      }
      if (response.articles) {
        const preparedArticleList = addIdToArticles(response.articles);
        return { ...response, articles: preparedArticleList };
      }
      throw createError('Unknown error of loading articles');
    })
    .catch((error) => {
      if (error.message) {
        return rejectWithValue(error);
      }
      const err = createError(error);
      return rejectWithValue(err);
    });
});
