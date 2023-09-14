import { createAsyncThunk } from '@reduxjs/toolkit';
import { useHistory } from 'react-router-dom';

import { getFromStorage, setToStorage } from 'services/storage';
import { getData, updateData } from 'services/api';
import { apiBaseUrl } from 'utilities/constants';
import { RootState } from 'redux-toolkit';

export const loadProfile = createAsyncThunk('profile/loadProfile', async (_, { rejectWithValue }) => {
  const history = useHistory();
  const email = getFromStorage('lastEmail');
  const token = getFromStorage(`${email}-login-token`);
  if (!token) {
    const error = new Error(`No login token for this email - ${email}`);
    error.response = null;
    return rejectWithValue(error);
  }
  return getData(`${apiBaseUrl}/user`, token)
    .then(
      (response) => {
        if (response.status === 401) {
          history.push('/sign-in');
        } else if ((response.status >= 200 && response.status < 300) || response.status === 422) {
          return response.json();
        }
        const error = new Error(`Load profile error, code ${response.status.toString()} - error after API answer`);
        error.response = response;
        throw error;
      },
      (err) => {
        const error = new Error('Load profile error while sending data through API');
        error.response = err;
        throw error;
      }
    )
    .then((response) => {
      if (response.errors) {
        const errors = Object.entries(response.errors);
        const [errorName, errorMessage] = errors[0];
        const error = new Error(`Load profile error - ${errorName} ${errorMessage}`);
        error.response = response;
        throw error;
      }
      if (response.user) {
        return response.user;
      }
      throw new Error('Unknown error while loading profile');
    })
    .catch((error) => {
      return rejectWithValue(error);
    });
});

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async ({ event, history, data: formData }, { rejectWithValue, getState }) => {
    event.preventDefault();
    const state: RootState = getState();
    const { email } = state.profile;
    const token = getFromStorage(`${email}-login-token`);
    const data = {
      user: {
        email: formData.email,
        username: formData.username,
        image: formData.image.length ? formData.image : null,
        password: formData.password,
      },
    };
    return updateData({ url: `${apiBaseUrl}/user`, data, token })
      .then(
        (response) => {
          if (response.status === 401) {
            history.push('/sign-in');
          } else if ((response.status >= 200 && response.status < 300) || response.status === 422) {
            return response.json();
          }
          const error = new Error(`Update profile error, code ${response.status.toString()} - error after API answer`);
          error.response = response;
          throw error;
        },
        (err) => {
          // handle error from promise-api
          const error = new Error('Update profile error while updating data through API');
          error.response = err;
          throw error;
        }
      )
      .then((response) => {
        if (response.errors) {
          const errors = Object.entries(response.errors);
          const [errorName, errorMessage] = errors[0];
          const error = new Error(`Update profile error - ${errorName} ${errorMessage}`);
          error.response = response;
          throw error;
        }
        if (response.user) {
          setToStorage(`${response.user.email}-login-token`, response.user.token);
          setToStorage('lastEmail', response.user.email);
          return response.user;
        }
        throw new Error('Unknown error while updating profile');
      })
      .catch((error) => {
        return rejectWithValue(error);
      });
  }
);
