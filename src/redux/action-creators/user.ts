export const userLogOut = () => {
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

export const userRegisterError = (error) => {
  return {
    type: 'USER_REGISTER_ERROR',
    error: error.errors.body,
  };
};

export const userLoginSuccess = (json) => {
  return {
    type: 'USER_LOGIN_SUCCESS',
    userName: json.user.username,
    userImage: json.user.image,
  };
};

/* USER_LOGIN  USER_LOGIN_ERROR */
