import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { loadProfile, updateProfile } from './profileThunks';

type ProfileStateError = {
  name: string;
  message: string;
};

export type ProfileSliceState = {
  userName: string;
  email: string;
  image: string;
  bio: string;
  loadingProfile: boolean;
  loadProfileError: null | ProfileStateError;
  updatingProfile: boolean;
  updateProfileError: null | ProfileStateError;
};

const initialState: ProfileSliceState = {
  userName: '',
  email: '',
  image: '',
  bio: '',
  loadingProfile: false,
  loadProfileError: null,
  updatingProfile: false,
  updateProfileError: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.userName = '';
      state.email = '';
    },
    addInfoToProfile: (state, action: PayloadAction<{ username: string; email: string }>) => {
      state.userName = action.payload.username;
      state.email = action.payload.email;
    },
  },
  extraReducers: {
    [loadProfile.pending]: (state) => {
      state.loadingProfile = true;
      state.loadProfileError = null;
    },
    [loadProfile.fulfilled]: (state, action) => {
      state.loadingProfile = false;
      state.userName = action.payload.username;
      state.email = action.payload.email;
      state.bio = action.payload.bio || '';
      state.image = action.payload.image || '';
    },
    [loadProfile.rejected]: (state, action: PayloadAction<ProfileStateError>) => {
      state.loadingProfile = false;
      state.loadProfileError = action.payload;
    },
    [updateProfile.pending]: (state) => {
      state.updatingProfile = true;
      state.updateProfileError = null;
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.updatingProfile = false;
      state.userName = action.payload.username;
      state.image = action.payload.image || '';
      state.email = action.payload.email;
    },
    [updateProfile.rejected]: (state, action: PayloadAction<ProfileStateError>) => {
      state.updatingProfile = false;
      state.updateProfileError = action.payload;
    },
  },
});

export const profileSLiceReducer = profileSlice.reducer;
export const { clearProfile, addInfoToProfile } = profileSlice.actions;
