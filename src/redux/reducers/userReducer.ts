const initialState = {
  registering: false,
  registerError: null,
  loggingIn: false,
  loginError: null,
  authorized: false,
  loadingProfile: false,
  loadProfileError: null,
  updatingProfile: false,
  updateProfileError: null,
  profile: {
    userName: '',
    email: '',
    bio: '',
    image: '',
  },
  userName: '',
  userImage: '',
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
        userBio: '',
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
        registerError: action.error,
      };
    case 'USER_LOGIN':
      return {
        ...state,
        loggingIn: true,
        loginError: null,
      };
    case 'USER_LOGIN_SUCCESS':
      return {
        ...state,
        loggingIn: false,
        authorized: true,
        userName: action.userName,
        userImage: action.userImage,
        userBio: action.userBio,
      };
    case 'USER_LOGIN_ERROR':
      return {
        ...state,
        loggingIn: false,
        loginError: action.error,
      };
    default:
      return state;
  }
};
