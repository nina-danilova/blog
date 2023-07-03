const initialState = {
  registering: false,
  registerError: null,
  loggingIn: false,
  loginError: null,
  authorized: false,
  userName: 'John Doe',
  userImage: './img/icon-author-avatar.svg',
  userBio: '',
};

// eslint-disable-next-line default-param-last
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOG_OUT':
      return {
        ...state,
        authorized: false,
        userName: '',
        userImage: '',
      };
    case 'USER_REGISTER':
      return {
        ...state,
        registering: true,
        registerError: null,
      };
    case 'USER_REGISTER_SUCCESS':
      return {
        ...state,
        registering: false,
      };
    case 'USER_REGISTER_ERROR':
      return {
        ...state,
        registering: false,
        error: action.error,
      };
    case 'USER_LOGIN_SUCCESS':
      return {
        ...state,
        loggingIn: false,
        authorized: true,
        userName: action.userName,
        userImage: action.userImage,
      };
    default:
      return state;
  }
};
