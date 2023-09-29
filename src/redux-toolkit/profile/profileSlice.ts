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
  profileError: null | ServiceError;
};

const initialState: ProfileSliceState = {
  userName: '',
  email: '',
  image: '',
  bio: '',
  loadingProfile: false,
  updatingProfile: false,
  profileError: null,
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
        state.profileError = null;
      })
      .addCase(loadProfile.fulfilled, (state, action) => {
        state.loadingProfile = false;
        state.userName = action.payload.username;
        state.email = action.payload.email;
        state.bio = action.payload.bio || '';
        state.image = action.payload.image || '';
      })
      .addCase(updateProfile.pending, (state) => {
        state.updatingProfile = true;
        state.profileError = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updatingProfile = false;
        state.userName = action.payload.username;
        state.image = action.payload.image || '';
        state.email = action.payload.email;
      })
      .addMatcher(isError, (state, action: PayloadAction<ServiceError>) => {
        state.loadingProfile = false;
        state.updatingProfile = false;
        state.profileError = action.payload;
      });
  },
});

export const profileSLiceReducer = profileSlice.reducer;
export const { clearProfile, addInfoToProfile } = profileSlice.actions;
