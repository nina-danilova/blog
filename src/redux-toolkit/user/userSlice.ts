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
  isRegistering: boolean;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  error: null | ServiceError;
  isAuthorized: boolean;
  profile: undefined | ProfileSliceState;
};

const initialState: UserSliceState = {
  isRegistering: false,
  isLoggingIn: false,
  isLoggingOut: false,
  error: null,
  isAuthorized: false,
  profile: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleAuth: (state) => {
      state.isAuthorized = !state.isAuthorized;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.isRegistering = true;
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state) => {
        state.isRegistering = false;
        state.error = null;
      })
      .addCase(userLogin.pending, (state) => {
        state.isLoggingIn = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state) => {
        state.isLoggingIn = false;
        state.isAuthorized = true;
        state.error = null;
      })
      .addCase(userLogOut.pending, (state) => {
        state.isLoggingOut = true;
        state.error = null;
      })
      .addCase(userLogOut.fulfilled, (state) => {
        state.isLoggingOut = false;
        state.isAuthorized = false;
        state.error = null;
      })
      .addMatcher(isError, (state, action: PayloadAction<ServiceError>) => {
        state.isRegistering = false;
        state.isLoggingIn = false;
        state.isLoggingOut = false;
        state.error = action.payload;
      });
  },
});

export const userSliceReducer = userSlice.reducer;
export const { toggleAuth } = userSlice.actions;
