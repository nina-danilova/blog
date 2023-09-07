import { useHistory } from 'react-router-dom';

import { getData, updateData } from 'services/api';
import { getFromStorage, setToStorage } from 'services/storage';
import { apiBaseUrl } from 'utilities/constants';

export const loadProfileStart = () => {
  return {
    type: 'LOAD_PROFILE_START',
  };
};

export const loadProfileSuccess = (json) => {
  return {
    type: 'LOAD_PROFILE_SUCCESS',
    userName: json.user.username,
    email: json.user.email,
    bio: json.user.bio || '',
    image: json.user.image || '',
  };
};

export const loadProfileError = (error) => {
  return {
    type: 'LOAD_PROFILE_ERROR',
    error: error.message,
    response: error.response,
  };
};

export const loadProfile = () => {
  return (dispatch, getState) => {
    const { user } = getState();
    if (user.profile?.loadingProfile || user.profile?.userName || user.profile?.userName === '') {
      return;
    }
    const history = useHistory();
    const email = getFromStorage('lastEmail');
    const token = getFromStorage(`${email}-login-token`);
    if (!token) {
      const error = new Error(`No login token for this email - ${email}`);
      error.response = null;
      dispatch(loadProfileError(error));
      return;
    }
    dispatch(loadProfileStart());
    getData(`${apiBaseUrl}/user`, token)
      .then(
        (response) => {
          if (response.status === 401) {
            history.push('/sign-in');
          } else if ((response.status >= 200 && response.status < 300) || response.status === 422) {
            return response.json();
          }
          const error = new Error(`Load profile error, code ${response.status.toString()} - error after API answer`);
          error.response = response;
          throw error;
        },
        (err) => {
          // handle error from promise-api
          const error = new Error('Load profile error while sending data through API');
          error.response = err;
          throw error;
        }
      )
      .then((response) => {
        if (response.errors) {
          const errors = Object.entries(response.errors);
          const [errorName, errorMessage] = errors[0];
          const error = new Error(`Load profile error - ${errorName} ${errorMessage}`);
          error.response = response;
          throw error;
        }
        if (response.user) {
          dispatch(loadProfileSuccess(response));
        }
      })
      .catch((error) => {
        dispatch(loadProfileError(error));
      });
  };
};

export const updateProfileStart = () => {
  return {
    type: 'UPDATE_PROFILE_START',
  };
};

export const updateProfileSuccess = (json) => {
  setToStorage(`${json.user.email}-login-token`, json.user.token);
  setToStorage('lastEmail', json.user.email);
  return {
    type: 'UPDATE_PROFILE_SUCCESS',
    userName: json.user.username,
    email: json.user.email,
    bio: json.user.bio,
    image: json.user.image,
  };
};

export const updateProfileError = (error) => {
  return {
    type: 'UPDATE_PROFILE_ERROR',
    error: error.message,
    response: error.response,
  };
};

type UpdateProfileProps = {
  event;
  history;
  data;
};

export const updateProfile = ({ event, history, data: formData }: UpdateProfileProps) => {
  return (dispatch, getState) => {
    event.preventDefault();
    const state = getState();
    const { user } = state;
    const { email, updatingProfile } = user.profile;
    if (updatingProfile) {
      return;
    }
    const token = getFromStorage(`${email}-login-token`);
    const data = {
      user: {
        email: formData.email,
        username: formData.username,
        image: formData.image.length ? formData.image : null,
        password: formData.password,
      },
    };
    dispatch(updateProfileStart());
    updateData({ url: `${apiBaseUrl}/user`, data, token })
      .then(
        (response) => {
          if (response.status === 401) {
            history.push('/sign-in');
          } else if ((response.status >= 200 && response.status < 300) || response.status === 422) {
            return response.json();
          }
          const error = new Error(`Update profile error, code ${response.status.toString()} - error after API answer`);
          error.response = response;
          throw error;
        },
        (err) => {
          // handle error from promise-api
          const error = new Error('Update profile error while updating data through API');
          error.response = err;
          throw error;
        }
      )
      .then((response) => {
        if (response.errors) {
          const errors = Object.entries(response.errors);
          const [errorName, errorMessage] = errors[0];
          const error = new Error(`Update profile error - ${errorName} ${errorMessage}`);
          error.response = response;
          throw error;
        }
        if (response.user) {
          dispatch(updateProfileSuccess(response));
        }
      })
      .catch((error) => {
        dispatch(updateProfileError(error));
      });
  };
};
