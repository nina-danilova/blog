import { createAsyncThunk } from '@reduxjs/toolkit';

import { sendLoginInfo, sendRegisterInfo } from 'services/blog-service';
import { getRegisterToken, setAuthStatus } from 'services/storage-service';
import { clearProfile, addInfoToProfile } from 'redux-toolkit/profile/profileSlice';
import { AppDispatch } from 'redux-toolkit';
import { createError, isErrorServiceError, ServiceError } from 'utilities/errors';

export const userLogOut = createAsyncThunk<void, undefined, { dispatch: AppDispatch }>(
  'user/userLogOut',
  async (_, { dispatch }) => {
    setAuthStatus(false);
    dispatch(clearProfile());
  }
);

type UserRegisterPayloadProps = {
  data: {
    username: string;
    email: string;
    password: string;
  };
};

export const userRegister = createAsyncThunk<void, UserRegisterPayloadProps, { rejectValue: ServiceError }>(
  'user/userRegister',
  async ({ data: formData }, { rejectWithValue }) => {
    const data = {
      user: {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      },
    };
    try {
      return await sendRegisterInfo({ data });
    } catch (error) {
      if (isErrorServiceError(error)) {
        return rejectWithValue(error);
      }
      throw error;
    }
  }
);

export type LoginFormInput = {
  email: string;
  password: string;
};

type UserLoginPayloadProps = {
  data: LoginFormInput;
};

export const userLogin = createAsyncThunk<
  void,
  UserLoginPayloadProps,
  {
    dispatch: AppDispatch;
    rejectValue: ServiceError;
  }
>('user/userLogin', async ({ data: formData }, { dispatch, rejectWithValue }) => {
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
  try {
    const result = await sendLoginInfo({ data, token });
    dispatch(
      addInfoToProfile({
        username: result.username,
        email: result.email,
      })
    );
    return Promise.resolve();
  } catch (error) {
    if (isErrorServiceError(error)) {
      return rejectWithValue(error);
    }
    throw error;
  }
});
