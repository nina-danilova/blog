import { useHistory } from 'react-router-dom';

import { store } from '../store';
import { getData, updateData } from '../../services/api';

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
  return (dispatch) => {
    const { user } = store.getState();
    // !loadingProfile && !userName && userName !== ''
    if (user.profile?.loadingProfile || user.profile?.userName || user.profile?.userName === '') {
      return;
    }
    const history = useHistory();
    const email = localStorage.getItem('lastEmail');
    const token = localStorage.getItem(`${email}-login-token`);
    if (!token) {
      const error = new Error(`No login token for this email - ${email}`);
      error.response = null;
      dispatch(loadProfileError(error));
      return;
    }
    dispatch(loadProfileStart());
    getData('https://blog.kata.academy/api/user', token)
      .then(
        function (response) {
          if (response.status === 401) {
            history.push('/sign-in');
          } else if ((response.status >= 200 && response.status < 300) || response.status === 422) {
            return response.json();
          }
          const error = new Error(`Load profile error, code ${response.status.toString()} - error after API answer`);
          error.response = response;
          throw error;
        },
        function (err) {
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
      .catch(function (error) {
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
  localStorage.setItem(`${json.user.email}-login-token`, json.user.token);
  localStorage.setItem('lastEmail', json.user.email);
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

export const updateProfile = (evt, history, formData) => {
  return (dispatch, getState) => {
    evt.preventDefault();
    const state = getState();
    const { user } = state;
    const { email, updatingProfile } = user.profile;
    if (updatingProfile) {
      return;
    }
    const token = localStorage.getItem(`${email}-login-token`);
    const data = {
      user: {
        email: formData.email,
        username: formData.username,
        image: formData.image.length ? formData.image : null,
        password: formData.password,
      },
    };
    dispatch(updateProfileStart());
    updateData('https://blog.kata.academy/api/user', data, token)
      .then(
        function (response) {
          if (response.status === 401) {
            history.push('/sign-in');
          } else if ((response.status >= 200 && response.status < 300) || response.status === 422) {
            return response.json();
          }
          const error = new Error(`Update profile error, code ${response.status.toString()} - error after API answer`);
          error.response = response;
          throw error;
        },
        function (err) {
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
      .catch(function (error) {
        dispatch(updateProfileError(error));
      });
  };
};

export const updateProfileFormUserName = (value) => {
  return {
    type: 'UPDATE_PROFILE_FORM_USER_NAME',
    value,
  };
};

export const updateProfileFormEmail = (value) => {
  return {
    type: 'UPDATE_PROFILE_FORM_EMAIL',
    value,
  };
};

export const updateProfileFormImageUrl = (value) => {
  return {
    type: 'UPDATE_PROFILE_FORM_IMAGE_URL',
    value,
  };
};
