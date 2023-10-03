import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProfileSliceState } from 'redux-toolkit/profile/profileSlice';
import { ServiceError } from 'utilities/errors';

import { userRegister, userLogin, userLogOut } from './userThunks';

const isError = (action: AnyAction) => {
  return (
    action.type.endsWith('userRegister/rejected') ||
    action.type.endsWith('userLogin/rejected') ||
    action.type.endsWith('userLogOut/rejected')
  );
};

type UserSliceState = {
  registering: boolean;
  loggingIn: boolean;
  error: null | ServiceError;
  authorized: boolean;
  profile: undefined | ProfileSliceState;
};

const initialState: UserSliceState = {
  registering: false,
  loggingIn: false,
  error: null,
  authorized: false,
  profile: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleAuth: (state) => {
      state.authorized = !state.authorized;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.registering = true;
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state) => {
        state.registering = false;
        state.error = null;
      })
      .addCase(userLogin.pending, (state) => {
        state.loggingIn = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state) => {
        state.loggingIn = false;
        state.authorized = true;
        state.error = null;
      })
      .addCase(userLogOut.fulfilled, (state) => {
        state.authorized = false;
        state.error = null;
      })
      .addMatcher(isError, (state, action: PayloadAction<ServiceError>) => {
        state.registering = false;
        state.loggingIn = false;
        state.error = action.payload;
      });
  },
});

export const userSliceReducer = userSlice.reducer;
export const { toggleAuth } = userSlice.actions;
