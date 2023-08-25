import { sendData } from 'services/api';

import { loadProfileSuccess } from './profile';

export const userLogOut = () => {
  localStorage.setItem('userAuthorized', 'false');
  localStorage.removeItem('lastEmail');
  return {
    type: 'USER_LOG_OUT',
  };
};

export const userRegisterStart = () => {
  return {
    type: 'USER_REGISTER_START',
  };
};

export const userRegisterSuccess = (json) => {
  return {
    type: 'USER_REGISTER_SUCCESS',
    email: json.user.email,
    token: json.user.token,
    userName: json.user.userName,
    userBio: json.user.bio,
    userImage: json.user.userImage,
  };
};

export const userRegisterError = (error) => {
  return {
    type: 'USER_REGISTER_ERROR',
    error: error.message,
    response: error.response,
  };
};

export const registerNewUser = (evt, history, formData) => {
  return (dispatch, getState) => {
    evt.preventDefault();
    const { user } = getState();
    if (user.registering) {
      return;
    }
    const data = {
      user: {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      },
    };
    dispatch(userRegisterStart());
    sendData('https://blog.kata.academy/api/users', data)
      .then(
        function (response) {
          if (response.status === 401) {
            history.push('/sign-in');
          } else if ((response.status >= 200 && response.status < 300) || response.status === 422) {
            return response.json();
          }
          const error = new Error(`User register error, code ${response.status.toString()} - error after API answer`);
          error.response = response;
          throw error;
        },
        function (err) {
          // handle error from promise-api
          const error = new Error('User register error while sending data through API');
          error.response = err;
          throw error;
        }
      )
      .then((response) => {
        if (response.errors) {
          const errors = Object.entries(response.errors);
          const [errorName, errorMessage] = errors[0];
          const error = new Error(`User register error - ${errorName} ${errorMessage}`);
          error.response = response;
          throw error;
        }
        if (response.user) {
          localStorage.setItem(`$${response.user.email}-token`, response.user.token);
          dispatch(userRegisterSuccess(response));
          history.push('/');
        }
      })
      .catch(function (error) {
        dispatch(userRegisterError(error));
      });
  };
};

export const userLoginStart = () => {
  return {
    type: 'USER_LOGIN_START',
  };
};

export const userLoginSuccess = () => {
  return {
    type: 'USER_LOGIN_SUCCESS',
  };
};

export const userLoginError = (error) => {
  return {
    type: 'USER_LOGIN_ERROR',
    error: error.message,
    response: error.response,
  };
};

export const userLogin = (evt, history, formData) => {
  return (dispatch, getState) => {
    evt.preventDefault();
    const { user } = getState();
    if (user.loggingIn) {
      return;
    }
    const data = {
      user: {
        email: formData.email,
        password: formData.password,
      },
    };
    const token = localStorage.getItem(`${data.user.email}-token`);
    if (!token) {
      const error = new Error('No token for this email');
      error.response = data;
      dispatch(userLoginError(error));
      return;
    }
    dispatch(userLoginStart());
    sendData('https://blog.kata.academy/api/users/login', data, token)
      .then(
        function (response) {
          if (response.status === 401) {
            history.push('/sign-in');
          } else if ((response.status >= 200 && response.status < 300) || response.status === 422) {
            return response.json();
          }
          const error = new Error(`User login error, code ${response.status.toString()} - error after API answer`);
          error.response = response;
          throw error;
        },
        function (err) {
          // handle error from promise-api
          const error = new Error('User login error while sending data through API');
          error.response = err;
          throw error;
        }
      )
      .then((response) => {
        if (response.errors) {
          const errors = Object.entries(response.errors);
          const [errorName, errorMessage] = errors[0];
          const error = new Error(`User login error - ${errorName} ${errorMessage}`);
          error.response = response;
          throw error;
        }
        if (response.user) {
          localStorage.setItem(`${response.user.email}-login-token`, response.user.token);
          localStorage.setItem('userAuthorized', 'true');
          localStorage.setItem('lastEmail', response.user.email);
          dispatch(userLoginSuccess());
          dispatch(loadProfileSuccess(response));
          history.push('/');
        }
      })
      .catch(function (error) {
        dispatch(userLoginError(error));
      });
  };
};
