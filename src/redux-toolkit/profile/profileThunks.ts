import { createAsyncThunk } from '@reduxjs/toolkit';

import { getLoginToken } from 'services/storage-service';
import { getProfile, setProfile } from 'services/blog-service';
import { createError, isErrorServiceError, ServiceError } from 'utilities/errors';

import { Profile } from './profileSlice';

export const loadProfile = createAsyncThunk<Profile, undefined, { rejectValue: ServiceError }>(
  'profile/loadProfile',
  async (_, { rejectWithValue }) => {
    const token = getLoginToken();
    if (!token) {
      const error = createError('No login token for this email');
      return rejectWithValue(error);
    }
    try {
      return await getProfile(token);
    } catch (error) {
      if (isErrorServiceError(error)) {
        return rejectWithValue(error);
      }
      throw error;
    }
  }
);

export type UpdatedProfile = Profile & { token: string };

export type EditProfileFormInput = {
  username: string;
  email: string;
  password: string;
  image?: string;
};

type UpdateProfilePayloadProps = {
  data: EditProfileFormInput;
};

export const updateProfile = createAsyncThunk<
  UpdatedProfile,
  UpdateProfilePayloadProps,
  {
    rejectValue: ServiceError;
  }
>('profile/updateProfile', async ({ data: formData }, { rejectWithValue }) => {
  const token = getLoginToken();
  const data = {
    user: {
      email: formData.email,
      username: formData.username,
      image: formData.image?.length ? formData.image : null,
      password: formData.password,
    },
  };
  try {
    return await setProfile({ data, token });
  } catch (error) {
    if (isErrorServiceError(error)) {
      return rejectWithValue(error);
    }
    throw error;
  }
});
