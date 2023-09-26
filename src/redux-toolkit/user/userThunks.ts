import { createAsyncThunk } from '@reduxjs/toolkit';
import { FormEvent } from 'react';

import { sendData } from 'services/blog-service';
import { apiBaseUrl, linkPaths } from 'utilities/constants';
import { getRegisterToken, setAuthStatus, setLoginInfo, setRegisterInfo } from 'services/storage-service';
import { clearProfile, addInfoToProfile } from 'redux-toolkit/profile/profileSlice';
import { AppDispatch } from 'redux-toolkit';
import { createError } from 'utilities/errors';

export const userLogOut = createAsyncThunk<void, undefined, { dispatch: AppDispatch }>(
  'user/userLogOut',
  async (_, { dispatch }) => {
    setAuthStatus(false);
    dispatch(clearProfile());
  }
);

type UserRegisterPayloadProps = {
  event: FormEvent<HTMLFormElement>;
  history: any;
  data: {
    username: string;
    email: string;
    password: string;
  };
};

type UserRegisterRejectValue = {
  name: string;
  message: string;
  body?: any;
};

export const userRegister = createAsyncThunk<void, UserRegisterPayloadProps, { rejectValue: UserRegisterRejectValue }>(
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
    const { pathToSignIn, pathToHome } = linkPaths;
    return sendData({ url: `${apiBaseUrl}/users`, data })
      .then(
        (response) => {
          if (response.status === 401) {
            history.push(pathToSignIn);
          } else if ((response.status >= 200 && response.status < 300) || response.status === 422) {
            return response.json();
          }
          throw createError(`User register error, code ${response.status.toString()} - error after API answer`);
        },
        (err) => {
          throw createError('User register error while sending data through API', err);
        }
      )
      .then((response) => {
        if (response.errors) {
          const errors = Object.entries(response.errors);
          const [errorName, errorMessage] = errors[0];
          throw createError(`User register error - ${errorName} ${errorMessage}`);
        }
        if (response.user) {
          setRegisterInfo(response.user);
          return history.push(pathToHome);
        }
        throw createError('Unknown error while registering user');
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

export type LoginFormInput = {
  email: string;
  password: string;
};

type UserLoginPayloadProps = {
  event: FormEvent<HTMLFormElement>;
  history: any;
  data: LoginFormInput;
};

type UserLoginRejectValue = {
  name: string;
  message: string;
  body?: any;
};

export const userLogin = createAsyncThunk<
  void,
  UserLoginPayloadProps,
  {
    dispatch: AppDispatch;
    rejectValue: UserLoginRejectValue;
  }
>('user/userLogin', async ({ event, history, data: formData }, { dispatch, rejectWithValue }) => {
  event.preventDefault();
  const data = {
    user: {
      email: formData.email,
      password: formData.password,
    },
  };
  const token = getRegisterToken(data.user.email);
  if (!token) {
    const error = createError('No register token for this email');
    return rejectWithValue(error);
  }
  const { pathToSignIn, pathToHome } = linkPaths;
  return sendData({ url: `${apiBaseUrl}/users/login`, data, token })
    .then(
      (response) => {
        if (response.status === 401) {
          history.push(pathToSignIn);
        } else if ((response.status >= 200 && response.status < 300) || response.status === 422) {
          return response.json();
        }
        throw createError(`User login error, code ${response.status.toString()} - error after API answer`);
      },
      (err) => {
        throw createError('User login error while sending data through API', err);
      }
    )
    .then((response) => {
      if (response.errors) {
        const errors = Object.entries(response.errors);
        const [errorName, errorMessage] = errors[0];
        throw createError(`User login error - ${errorName} ${errorMessage}`);
      }
      if (response.user) {
        setAuthStatus(true);
        setLoginInfo(response.user);
        dispatch(
          addInfoToProfile({
            username: response.user.username,
            email: response.user.email,
          })
        );
        return history.push(pathToHome);
      }
      throw createError('Unknown error while logging-in user');
    })
    .catch((error) => {
      if (error.message) {
        return rejectWithValue(error);
      }
      const err = createError(error);
      return rejectWithValue(err);
    });
});
