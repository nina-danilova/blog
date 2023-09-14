import { createAsyncThunk } from '@reduxjs/toolkit';

import { sendData } from 'services/api';
import { apiBaseUrl } from 'utilities/constants';
import { getFromStorage, removeFromStorage, setToStorage } from 'services/storage';
import { clearProfile, addInfoToProfile } from 'redux-toolkit/profile/profileSlice';

export const userLogOut = createAsyncThunk('user/userLogOut', async (_, { dispatch }) => {
  setToStorage('userAuthorized', 'false');
  removeFromStorage('lastEmail');
  dispatch(clearProfile());
});

export const userRegister = createAsyncThunk(
  'user/userRegister',
  async ({ event, history, data: formData }, { rejectWithValue }) => {
    event.preventDefault();
    const data = {
      user: {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      },
    };
    return sendData({ url: `${apiBaseUrl}/users`, data })
      .then(
        (response) => {
          if (response.status === 401) {
            history.push('/sign-in');
          } else if ((response.status >= 200 && response.status < 300) || response.status === 422) {
            return response.json();
          }
          const error = new Error(`User register error, code ${response.status.toString()} - error after API answer`);
          error.response = response;
          throw error;
        },
        (err) => {
          // handle error from promise-api
          const error = new Error('User register error while sending data through API');
          error.response = err;
          throw error;
        }
      )
      .then((response) => {
        if (response.errors) {
          const errors = Object.entries(response.errors);
          const [errorName, errorMessage] = errors[0];
          const error = new Error(`User register error - ${errorName} ${errorMessage}`);
          error.response = response;
          throw error;
        }
        if (response.user) {
          setToStorage(`${response.user.email}-token`, response.user.token);
          history.push('/');
        }
      })
      .catch((error) => {
        return rejectWithValue(error);
      });
  }
);

export const userLogin = createAsyncThunk(
  'user/userLogin',
  async ({ event, history, data: formData }, { dispatch, rejectWithValue }) => {
    event.preventDefault();
    const data = {
      user: {
        email: formData.email,
        password: formData.password,
      },
    };
    const token = getFromStorage(`${data.user.email}-token`);
    if (!token) {
      const error = new Error('No token for this email');
      error.response = data;
      return rejectWithValue(error);
    }
    return sendData({ url: `${apiBaseUrl}/users/login`, data, token })
      .then(
        (response) => {
          if (response.status === 401) {
            history.push('/sign-in');
          } else if ((response.status >= 200 && response.status < 300) || response.status === 422) {
            return response.json();
          }
          const error = new Error(`User login error, code ${response.status.toString()} - error after API answer`);
          error.response = response;
          throw error;
        },
        (err) => {
          const error = new Error('User login error while sending data through API');
          error.response = err;
          throw error;
        }
      )
      .then((response) => {
        if (response.errors) {
          const errors = Object.entries(response.errors);
          const [errorName, errorMessage] = errors[0];
          const error = new Error(`User login error - ${errorName} ${errorMessage}`);
          error.response = response;
          throw error;
        }
        if (response.user) {
          setToStorage(`${response.user.email}-login-token`, response.user.token);
          setToStorage('userAuthorized', 'true');
          setToStorage('lastEmail', response.user.email);
          dispatch(
            addInfoToProfile({
              username: response.user.username,
              email: response.user.email,
            })
          );
          history.push('/');
        }
      })
      .catch((error) => {
        return rejectWithValue(error);
      });
  }
);
