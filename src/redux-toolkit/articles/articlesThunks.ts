import { createAsyncThunk } from '@reduxjs/toolkit';

import { getData } from 'services/api';
import { apiBaseUrl } from 'utilities/constants';

const addIdToArticles = (articleList) => {
  let id = 0;
  const articleListWithId = articleList.map((article) => {
    const articleWithId = { ...article, id };
    id += 1;
    return articleWithId;
  });
  return articleListWithId;
};

const getOffset = (page) => {
  return (page - 1) * 20;
};

export const loadArticles = createAsyncThunk(
  'articles/loadArticles',
  async ({ currentPage, history }, { rejectWithValue }) => {
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
          const preparedResponse = { ...response, articles: preparedArticleList };
          return preparedResponse;
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
  }
);
