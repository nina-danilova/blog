import { createAsyncThunk } from '@reduxjs/toolkit';

import { getData } from 'services/api';
import { apiBaseUrl } from 'utilities/constants';
import { Article } from 'redux-toolkit/article/articleSlice';

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
  history: any;
};

type LoadArticlesRejectValue = {
  name: string;
  message: string;
  body?: any;
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
  return getData(`${apiBaseUrl}/articles?limit=20&offset=${offset}`)
    .then(
      (response) => {
        if (response.status === 401) {
          history.push('/sign-in');
        } else if ((response.status >= 200 && response.status < 300) || response.status === 422) {
          return response.json();
        }
        // const error = new Error(`Load articles error, code ${response.status.toString()} - error after API answer`);
        // error.response = response;
        const error = {
          name: 'Error',
          message: `Load articles error, code ${response.status.toString()} - error after API answer`,
        };
        // throw new Error(error);
        throw error;
      },
      (err) => {
        // const error = new Error('Load articles error while sending data through API');
        // error.response = err;
        const error = {
          name: 'Error',
          message: 'Load articles error while sending data through API',
          body: err,
        };
        throw error;
      }
    )
    .then((response) => {
      if (response.errors) {
        const errors = Object.entries(response.errors);
        const [errorName, errorMessage] = errors[0];
        // const error = new Error(`Load articles error - ${errorName} ${errorMessage}`);
        // error.response = response;
        const error = {
          name: 'Error',
          message: `Load articles error - ${errorName} ${errorMessage}`,
        };
        throw error;
      }
      if (response.articles) {
        const preparedArticleList = addIdToArticles(response.articles);
        return { ...response, articles: preparedArticleList };
      }
      const error = {
        name: 'Error',
        message: 'Unknown error of loading articles',
      };
      throw error;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });
});
