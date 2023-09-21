import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProfileSliceState } from 'redux-toolkit/profile/profileSlice';
import { isError } from 'utilities/checks';

import { userRegister, userLogin, userLogOut } from './userThunks';

type UserStateError = {
  name: string;
  message: string;
};

type UserSliceState = {
  registering: boolean;
  // registerError: null | UserStateError;
  loggingIn: boolean;
  // loginError: null | UserStateError;
  userError: null | UserStateError;
  authorized: boolean;
  profile: undefined | ProfileSliceState;
};

const initialState: UserSliceState = {
  registering: false,
  // registerError: null,
  loggingIn: false,
  // loginError: null,
  userError: null,
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
        // state.registerError = null;
        state.userError = null;
      })
      .addCase(userRegister.fulfilled, (state) => {
        state.registering = false;
      })
      .addCase(userLogin.pending, (state) => {
        state.loggingIn = true;
        // state.loginError = null;
        state.userError = null;
      })
      .addCase(userLogin.fulfilled, (state) => {
        state.loggingIn = false;
        state.authorized = true;
      })
      .addCase(userLogOut.fulfilled, (state) => {
        state.authorized = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<UserStateError>) => {
        state.registering = false;
        state.loggingIn = false;
        state.userError = action.payload;
      });
  },
});

export const userSliceReducer = userSlice.reducer;
export const { toggleAuth } = userSlice.actions;
