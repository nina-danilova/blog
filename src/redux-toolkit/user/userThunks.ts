import { createAsyncThunk } from '@reduxjs/toolkit';
import { FormEvent } from 'react';

import { sendData } from 'services/api';
import { apiBaseUrl } from 'utilities/constants';
import { getFromStorage, removeFromStorage, setToStorage } from 'services/storage';
import { clearProfile, addInfoToProfile } from 'redux-toolkit/profile/profileSlice';
import { AppDispatch } from 'redux-toolkit';

export const userLogOut = createAsyncThunk<void, undefined, { dispatch: AppDispatch }>(
  'user/userLogOut',
  async (_, { dispatch }) => {
    setToStorage('userAuthorized', 'false');
    removeFromStorage('lastEmail');
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
    return sendData({ url: `${apiBaseUrl}/users`, data })
      .then(
        (response) => {
          if (response.status === 401) {
            history.push('/sign-in');
          } else if ((response.status >= 200 && response.status < 300) || response.status === 422) {
            return response.json();
          }
          // const error = new Error(`User register error, code ${response.status.toString()} - error after API answer`);
          // error.response = response;
          const error = {
            name: 'Error',
            message: `User register error, code ${response.status.toString()} - error after API answer`,
          };
          throw error;
        },
        (err) => {
          // handle error from promise-api
          // const error = new Error('User register error while sending data through API');
          // error.response = err;
          const error = {
            name: 'Error',
            message: 'User register error while sending data through API',
            body: err,
          };
          throw error;
        }
      )
      .then((response) => {
        if (response.errors) {
          const errors = Object.entries(response.errors);
          const [errorName, errorMessage] = errors[0];
          // const error = new Error(`User register error - ${errorName} ${errorMessage}`);
          // error.response = response;
          const error = {
            name: 'Error',
            message: `User register error - ${errorName} ${errorMessage}`,
          };
          throw error;
        }
        if (response.user) {
          setToStorage(`${response.user.email}-token`, response.user.token);
          return history.push('/');
        }
        const error = {
          name: 'Error',
          message: 'Unknown error while registering user',
        };
        throw error;
      })
      .catch((error) => {
        return rejectWithValue(error);
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
  const token = getFromStorage(`${data.user.email}-token`);
  if (!token) {
    // const error = new Error('No token for this email');
    // error.response = data;
    const error = {
      name: 'Error',
      message: 'No token for this email',
    };
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
        // const error = new Error(`User login error, code ${response.status.toString()} - error after API answer`);
        // error.response = response;
        const error = {
          name: 'Error',
          message: `User login error, code ${response.status.toString()} - error after API answer`,
        };
        throw error;
      },
      (err) => {
        // const error = new Error('User login error while sending data through API');
        // error.response = err;
        const error = {
          name: 'Error',
          message: 'User login error while sending data through API',
          body: err,
        };
        throw error;
      }
    )
    .then((response) => {
      if (response.errors) {
        const errors = Object.entries(response.errors);
        const [errorName, errorMessage] = errors[0];
        // const error = new Error(`User login error - ${errorName} ${errorMessage}`);
        // error.response = response;
        const error = {
          name: 'Error',
          message: `User login error - ${errorName} ${errorMessage}`,
        };
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
        return history.push('/');
      }
      const error = {
        name: 'Error',
        message: 'Unknown error while logging-in user',
      };
      throw error;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });
});
