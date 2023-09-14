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
        const error = new Error(`Load article error, code ${response.status.toString()} - error after API answer`);
        error.response = response;
        throw error;
      },
      (err) => {
        // handle error from promise-api
        const error = new Error('Load article error while sending data through API');
        error.response = err;
        throw error;
      }
    )
    .then((response) => {
      if (response.errors) {
        const errors = Object.entries(response.errors);
        const [errorName, errorMessage] = errors[0];
        const error = new Error(`Load article error - ${errorName} ${errorMessage}`);
        error.response = response;
        throw error;
      }
      if (response.article) {
        return response;
      }
      return new Error('Unknown error of loading article');
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
