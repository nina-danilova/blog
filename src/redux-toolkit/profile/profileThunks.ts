import { FormEvent } from 'react';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { getFromStorage, setToStorage } from 'services/storage';
import { getData, updateData } from 'services/api';
import { apiBaseUrl } from 'utilities/constants';
import { RootState } from 'redux-toolkit';

export type EditProfileFormInput = {
  username: string;
  email: string;
  password: string;
  image?: string | undefined;
};

type Profile = {
  username: string;
  email: string;
  bio: string | undefined;
  image: string | undefined;
};

type LoadProfilePayloadProps = {
  history: any;
};

type LoadProfileRejectValue = {
  name: string;
  message: string;
  body?: any;
};

export const loadProfile = createAsyncThunk<Profile, LoadProfilePayloadProps, { rejectValue: LoadProfileRejectValue }>(
  'profile/loadProfile',
  async ({ history }, { rejectWithValue }) => {
    // const history = useHistory();
    const email = getFromStorage('lastEmail');
    const token = getFromStorage(`${email}-login-token`);
    if (!token) {
      const error = {
        name: 'Error',
        message: `No login token for this email - ${email}`,
      };
      return rejectWithValue(error);
    }
    return getData(`${apiBaseUrl}/user`, token)
      .then(
        (response) => {
          if (response.status === 401) {
            history.push('/sign-in');
          } else if ((response.status >= 200 && response.status < 300) || response.status === 422) {
            return response.json();
          }
          // const error = new Error(`Load profile error, code ${response.status.toString()} - error after API answer`);
          // error.response = response;
          const error = {
            name: 'Error',
            message: `Load profile error, code ${response.status.toString()} - error after API answer`,
          };
          throw error;
        },
        (err) => {
          // const error = new Error('Load profile error while sending data through API');
          // error.response = err;
          const error = {
            name: 'Error',
            message: 'Load profile error while sending data through API',
            body: err,
          };
          throw error;
        }
      )
      .then((response) => {
        if (response.errors) {
          const errors = Object.entries(response.errors);
          const [errorName, errorMessage] = errors[0];
          // const error = new Error(`Load profile error - ${errorName} ${errorMessage}`);
          // error.response = response;
          const error = {
            name: 'Error',
            message: `Load profile error - ${errorName} ${errorMessage}`,
          };
          throw error;
        }
        if (response.user) {
          return response.user;
        }
        const error = {
          name: 'Error',
          message: 'Unknown error while loading profile',
        };
        throw error;
      })
      .catch((error) => {
        return rejectWithValue(error);
      });
  }
);

type UpdatedProfile = {
  username: string;
  email: string;
  bio: string | undefined;
  image: string | undefined;
  token: string;
};

type UpdateProfilePayloadProps = {
  event: FormEvent<HTMLFormElement>;
  history: any;
  data: EditProfileFormInput;
};

type UpdateProfileRejectValue = {
  name: string;
  message: string;
  body?: any;
};

export const updateProfile = createAsyncThunk<
  UpdatedProfile,
  UpdateProfilePayloadProps,
  {
    rejectValue: UpdateProfileRejectValue;
    state: RootState;
  }
>('profile/updateProfile', async ({ event, history, data: formData }, { rejectWithValue, getState }) => {
  event.preventDefault();
  const state = getState();
  const { email } = state.profile;
  const token = getFromStorage(`${email}-login-token`);
  const data = {
    user: {
      email: formData.email,
      username: formData.username,
      image: formData.image?.length ? formData.image : null,
      password: formData.password,
    },
  };
  return updateData({ url: `${apiBaseUrl}/user`, data, token })
    .then(
      (response) => {
        if (response.status === 401) {
          history.push('/sign-in');
        } else if ((response.status >= 200 && response.status < 300) || response.status === 422) {
          return response.json();
        }
        // const error = new Error(`Update profile error, code ${response.status.toString()} - error after API answer`);
        // error.response = response;
        const error = {
          name: 'Error',
          message: `Update profile error, code ${response.status.toString()} - error after API answer`,
        };
        throw error;
      },
      (err) => {
        // handle error from promise-api
        // const error = new Error('Update profile error while updating data through API');
        // error.response = err;
        const error = {
          name: 'Error',
          message: 'Update profile error while updating data through API',
          body: err,
        };
        throw error;
      }
    )
    .then((response) => {
      if (response.errors) {
        const errors = Object.entries(response.errors);
        const [errorName, errorMessage] = errors[0];
        // const error = new Error(`Update profile error - ${errorName} ${errorMessage}`);
        // error.response = response;
        const error = {
          name: 'Error',
          message: `Update profile error - ${errorName} ${errorMessage}`,
        };
        throw error;
      }
      if (response.user) {
        setToStorage(`${response.user.email}-login-token`, response.user.token);
        setToStorage('lastEmail', response.user.email);
        return response.user;
      }
      const error = {
        name: 'Error',
        message: 'Unknown error while updating profile',
      };
      throw error;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });
});
