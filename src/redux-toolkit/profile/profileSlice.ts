import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ServiceError } from 'utilities/errors';

import { loadProfile, updateProfile } from './profileThunks';

const isError = (action: AnyAction) => {
  return action.type.endsWith('Profile/rejected');
};

export type Profile = {
  username: string;
  email: string;
  bio?: string;
  image?: string;
};

export type ProfileSliceState = {
  userName: string;
  email: string;
  image: string;
  bio: string;
  loadingProfile: boolean;
  updatingProfile: boolean;
  error: null | ServiceError;
};

const initialState: ProfileSliceState = {
  userName: '',
  email: '',
  image: '',
  bio: '',
  loadingProfile: false,
  updatingProfile: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.userName = '';
      state.email = '';
    },
    addInfoToProfile: (state, action: PayloadAction<Profile>) => {
      state.userName = action.payload.username;
      state.email = action.payload.email;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProfile.pending, (state) => {
        state.loadingProfile = true;
        state.error = null;
      })
      .addCase(loadProfile.fulfilled, (state, action) => {
        state.loadingProfile = false;
        state.userName = action.payload.username;
        state.email = action.payload.email;
        state.bio = action.payload.bio || '';
        state.image = action.payload.image || '';
        state.error = null;
      })
      .addCase(updateProfile.pending, (state) => {
        state.updatingProfile = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updatingProfile = false;
        state.userName = action.payload.username;
        state.image = action.payload.image || '';
        state.email = action.payload.email;
        state.error = null;
      })
      .addMatcher(isError, (state, action: PayloadAction<ServiceError>) => {
        state.loadingProfile = false;
        state.updatingProfile = false;
        state.error = action.payload;
      });
  },
});

export const profileSLiceReducer = profileSlice.reducer;
export const { clearProfile, addInfoToProfile } = profileSlice.actions;
