import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProfileSliceState } from 'redux-toolkit/profile/profileSlice';

import { userRegister, userLogin, userLogOut } from './userThunks';

type UserStateError = {
  name: string;
  message: string;
};

type UserSliceState = {
  registering: boolean;
  registerError: null | UserStateError;
  loggingIn: boolean;
  loginError: null | UserStateError;
  authorized: boolean;
  profile: undefined | ProfileSliceState;
};

const initialState: UserSliceState = {
  registering: false,
  registerError: null,
  loggingIn: false,
  loginError: null,
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
  extraReducers: {
    [userRegister.pending]: (state) => {
      state.registering = true;
      state.registerError = null;
    },
    [userRegister.fulfilled]: (state) => {
      state.registering = false;
    },
    [userRegister.rejected]: (state, action: PayloadAction<UserStateError>) => {
      state.registering = false;
      state.registerError = action.payload;
    },
    [userLogin.pending]: (state) => {
      state.loggingIn = true;
      state.loginError = null;
    },
    [userLogin.fulfilled]: (state) => {
      state.loggingIn = false;
      state.authorized = true;
    },
    [userLogin.rejected]: (state, action: PayloadAction<UserStateError>) => {
      state.loggingIn = false;
      state.loginError = action.payload;
    },
    [userLogOut.fulfilled]: (state) => {
      state.authorized = false;
    },
  },
});

export const userSliceReducer = userSlice.reducer;
export const { toggleAuth } = userSlice.actions;
