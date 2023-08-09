import { store } from '../store';
import { sendLogInInfo, sendRegisterInfo } from '../../services/api';

export const userLogOut = () => {
  localStorage.setItem('userAuthorized', 'false');
  localStorage.removeItem('lastUserName');
  localStorage.removeItem('lastUserImage');
  localStorage.removeItem('lastEmail');
  return {
    type: 'USER_LOG_OUT',
  };
};

export const userRegister = () => {
  return {
    type: 'USER_REGISTER',
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

export const userRegisterError = (text) => {
  return {
    type: 'USER_REGISTER_ERROR',
    error: text,
  };
};

export const registerNewUser = (evt, history, formData) => {
  evt.preventDefault();
  store.dispatch(userRegister());
  const data = {
    user: {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    },
  };
  sendRegisterInfo('https://blog.kata.academy/api/users', data)
    .then((response) => {
      if (response.user) {
        localStorage.setItem(`${response.user.email}-token`, response.user.token);
        store.dispatch(userRegisterSuccess(response));
        history.push('/');
      }
      if (response.errors) {
        const errors = Object.entries(response.errors);
        const [errorName, errorMessage] = errors[0];
        store.dispatch(userRegisterError(`User register error - ${errorName} ${errorMessage}`));
      }
    })
    .catch((error) => {
      store.dispatch(userRegisterError(error.message));
    });
};

export const userLogin = () => {
  return {
    type: 'USER_LOGIN',
  };
};

export const userLoginSuccess = (json) => {
  return {
    type: 'USER_LOGIN_SUCCESS',
    userName: json.user.userName,
    userImage: json.user.userImage,
    userBio: json.user.userBio,
  };
};

export const userLoginError = (text) => {
  return {
    type: 'USER_LOGIN_ERROR',
    error: text,
  };
};

export const userLogIn = (evt, history, formData) => {
  evt.preventDefault();
  store.dispatch(userLogin());
  const data = {
    user: {
      email: formData.email,
      password: formData.password,
    },
  };
  const token = localStorage.getItem(`${data.user.email}-token`);
  sendLogInInfo('https://blog.kata.academy/api/users/login', data, token)
    .then((response) => {
      if (response.user) {
        localStorage.setItem(`${response.user.email}-login-token`, response.user.token);
        localStorage.setItem('userAuthorized', 'true');
        localStorage.setItem('lastUserName', response.user.username);
        localStorage.setItem('lastUserImage', response.user.image);
        localStorage.setItem('lastEmail', response.user.email);
        localStorage.setItem('lastUserBio', response.user.bio);
        store.dispatch(userLoginSuccess(response));
        history.push('/');
      }
      if (response.errors) {
        const errors = Object.entries(response.errors);
        const [errorName, errorMessage] = errors[0];
        store.dispatch(userLoginError(`User login error - ${errorName} ${errorMessage}`));
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        history.push('/sign-in');
      } else {
        store.dispatch(userLoginError(error.message));
      }
    });
};

export const updateUser = (evt, history, formData) => {
  console.log(evt, history, formData);
};
