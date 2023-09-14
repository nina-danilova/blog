import { createSlice } from '@reduxjs/toolkit';

import { userRegister, userLogin, userLogOut } from './userThunks';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    registering: false,
    registerError: null,
    loggingIn: false,
    loginError: null,
    authorized: false,
    profile: undefined,
  },
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
    [userRegister.rejected]: (state, action) => {
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
    [userLogin.rejected]: (state, action) => {
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
