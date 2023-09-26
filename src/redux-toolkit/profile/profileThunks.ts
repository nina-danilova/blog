import { FormEvent } from 'react';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { getLoginToken, setLoginInfo } from 'services/storage-service';
import { getData, updateData } from 'services/blog-service';
import { apiBaseUrl, linkPaths } from 'utilities/constants';
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
    const token = getLoginToken();
    if (!token) {
      const error = createError('No login token for this email');
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
  }
>('profile/updateProfile', async ({ event, history, data: formData }, { rejectWithValue }) => {
  event.preventDefault();
  const token = getLoginToken();
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
        setLoginInfo(response.user);
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
