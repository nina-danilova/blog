import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { store } from '../store';
import { RootState } from '../reducers';
import { getData, sendProfileInfo } from '../../services/api';

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

export const loadProfileError = (text) => {
  return {
    type: 'LOAD_PROFILE_ERROR',
    error: text,
  };
};

export const loadProfile = () => {
  return (dispatch, getState) => {
    /* const state = getState();
    const { user } = state;
    const { userName, loadingProfile, email } = user.profile; */
    const history = useHistory();
    const email = localStorage.getItem('lastEmail');
    const token = localStorage.getItem(`${email}-login-token`);
    store.dispatch(loadProfileStart());
    getData('https://blog.kata.academy/api/user', token)
      .then(
        /* function (data) {
        // handle data
      }, function (error) {
        // handle error from promise-api
      }).catch(function (err) {
        // handle error from response.
      } */
        (response) => store.dispatch(loadProfileSuccess(response))
      )
      .catch((error) => {
        if (error.response.status === 401) {
          history.push('/sign-in');
        } else {
          store.dispatch(loadProfileError(error.message));
        }
      });
  };
};

export const updateProfileStart = () => {
  return {
    type: 'UPDATE_PROFILE_START',
  };
};

export const updateProfileSuccess = (json) => {
  return {
    type: 'UPDATE_PROFILE_SUCCESS',
    userName: json.user.username,
    email: json.user.email,
    bio: json.user.bio,
    image: json.user.image,
  };
};

export const updateProfileError = (text) => {
  return {
    type: 'UPDATE_PROFILE_ERROR',
    error: text,
  };
};

export const updateProfile = (evt, history, formData) => {
  return (dispatch, getState) => {
    /* const state = getState();
    const { user } = state;
    const { userName, loadingProfile, email } = user.profile; */
    evt.preventDefault();
    const email = localStorage.getItem('lastEmail');
    const token = localStorage.getItem(`${email}-login-token`);
    const data = {
      user: {
        email: formData.email,
        username: formData.username,
        bio: formData.bio,
        image: formData.image,
        password: formData.password,
      },
    };
    store.dispatch(updateProfileStart());
    sendProfileInfo('https://blog.kata.academy/api/user', data, token)
      .then(
        /* function (data) {
        // handle data
      }, function (error) {
        // handle error from promise-api
      }).catch(function (err) {
        // handle error from response.
      } */
        (response) => store.dispatch(updateProfileSuccess(response))
      )
      .catch((error) => {
        if (error.response.status === 401) {
          history.push('/sign-in');
        } else {
          store.dispatch(updateProfileError(error.message));
        }
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
