import { createAsyncThunk } from '@reduxjs/toolkit';

import { getData } from 'services/api';
import { apiBaseUrl } from 'utilities/constants';

export const loadArticle = createAsyncThunk('articles/loadArticle', async ({ id, history }, { rejectWithValue }) => {
  return getData(`${apiBaseUrl}/articles/${id}`)
    .then(
      (response) => {
        if (response.status === 401) {
          history.push('/sign-in');
        } else if ((response.status >= 200 && response.status < 300) || response.status === 422) {
          return response.json();
        }
        // const error = new Error(`Load article error, code ${response.status.toString()} - error after API answer`);
        // error.response = response;
        const error = {
          name: 'Error',
          message: `Load article error, code ${response.status.toString()} - error after API answer`,
        };
        throw error;
      },
      (err) => {
        // handle error from promise-api
        // const error = new Error('Load article error while sending data through API');
        // error.response = err;
        const error = {
          name: 'Error',
          message: 'Load article error while sending data through API',
          body: err,
        };
        throw error;
      }
    )
    .then((response) => {
      if (response.errors) {
        const errors = Object.entries(response.errors);
        const [errorName, errorMessage] = errors[0];
        // const error = new Error(`Load article error - ${errorName} ${errorMessage}`);
        // error.response = response;
        const error = {
          name: 'Error',
          message: `Load article error - ${errorName} ${errorMessage}`,
        };
        throw error;
      }
      if (response.article) {
        return response.article;
      }
      const error = {
        name: 'Error',
        message: 'Unknown error of loading article',
      };
      throw error;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });
});

export const createArticle = ({ event, history, data }) => {
  console.log(event, history, data);
  return {
    type: 'CREATE_ARTICLE',
    event,
    history,
    data,
  };
};
