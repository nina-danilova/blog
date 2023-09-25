import { FormEvent } from 'react';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { getFromStorage, setToStorage } from 'services/storage';
import { getData, updateData } from 'services/api';
import { apiBaseUrl, linkPaths } from 'utilities/constants';
import { RootState } from 'redux-toolkit';
import { createError } from 'utilities/errors';

export type EditProfileFormInput = {
  username: string;
  email: string;
  password: string;
  image?: string;
};

type Profile = {
  username: string;
  email: string;
  bio?: string;
  image?: string;
};

type LoadProfilePayloadProps = {
  history;
};

type LoadProfileRejectValue = {
  name: string;
  message: string;
  body?: Error;
};

export const loadProfile = createAsyncThunk<Profile, LoadProfilePayloadProps, { rejectValue: LoadProfileRejectValue }>(
  'profile/loadProfile',
  async ({ history }, { rejectWithValue }) => {
    const { pathToSignIn } = linkPaths;
    const email = getFromStorage('lastEmail');
    const token = getFromStorage(`${email}-login-token`);
    if (!token) {
      const error = createError(`No login token for this email - ${email}`);
      return rejectWithValue(error);
    }
    return getData(`${apiBaseUrl}/user`, token)
      .then(
        (response) => {
          if (response.status === 401) {
            history.push(pathToSignIn);
          } else if ((response.status >= 200 && response.status < 300) || response.status === 422) {
            return response.json();
          }
          throw createError(`Load profile error, code ${response.status.toString()} - error after API answer`);
        },
        (err) => {
          throw createError('Load profile error while sending data through API', err);
        }
      )
      .then((response) => {
        if (response.errors) {
          const errors = Object.entries(response.errors);
          const [errorName, errorMessage] = errors[0];
          throw createError(`Load profile error - ${errorName} ${errorMessage}`);
        }
        if (response.user) {
          return response.user;
        }
        throw createError('Unknown error while loading profile');
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

type UpdatedProfile = {
  username: string;
  email: string;
  bio: string | undefined;
  image: string | undefined;
  token: string;
};

type UpdateProfilePayloadProps = {
  event: FormEvent<HTMLFormElement>;
  history: any;
  data: EditProfileFormInput;
};

type UpdateProfileRejectValue = {
  name: string;
  message: string;
  body?: any;
};

export const updateProfile = createAsyncThunk<
  UpdatedProfile,
  UpdateProfilePayloadProps,
  {
    rejectValue: UpdateProfileRejectValue;
    state: RootState;
  }
>('profile/updateProfile', async ({ event, history, data: formData }, { rejectWithValue, getState }) => {
  event.preventDefault();
  const state = getState();
  const { email } = state.profile;
  const token = getFromStorage(`${email}-login-token`);
  const data = {
    user: {
      email: formData.email,
      username: formData.username,
      image: formData.image?.length ? formData.image : null,
      password: formData.password,
    },
  };
  const { pathToSignIn } = linkPaths;
  return updateData({ url: `${apiBaseUrl}/user`, data, token })
    .then(
      (response) => {
        if (response.status === 401) {
          history.push(pathToSignIn);
        } else if ((response.status >= 200 && response.status < 300) || response.status === 422) {
          return response.json();
        }
        throw createError(`Update profile error, code ${response.status.toString()} - error after API answer`);
      },
      (err) => {
        throw createError('Update profile error while updating data through API', err);
      }
    )
    .then((response) => {
      if (response.errors) {
        const errors = Object.entries(response.errors);
        const [errorName, errorMessage] = errors[0];
        throw createError(`Update profile error - ${errorName} ${errorMessage}`);
      }
      if (response.user) {
        setToStorage(`${response.user.email}-login-token`, response.user.token);
        setToStorage('lastEmail', response.user.email);
        return response.user;
      }
      throw createError('Unknown error while updating profile');
    })
    .catch((error) => {
      if (error.message) {
        return rejectWithValue(error);
      }
      const err = createError(error);
      return rejectWithValue(err);
    });
});
