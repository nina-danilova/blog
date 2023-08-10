import { profileReducer } from './profileReducer';

const initialState = {
  registering: false,
  registerError: null,
  loggingIn: false,
  loginError: null,
  authorized: false,
  userName: '',
  userImage: '',
  userBio: '',
  profile: undefined,
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
    case 'LOAD_PROFILE_START':
      return {
        ...state,
        profile: profileReducer(state.profile, action),
      };
    case 'LOAD_PROFILE_SUCCESS':
      return {
        ...state,
        profile: profileReducer(state.profile, action),
      };
    case 'LOAD_PROFILE_ERROR':
      return {
        ...state,
        profile: profileReducer(state.profile, action),
      };
    case 'UPDATE_PROFILE_START':
      return {
        ...state,
        profile: profileReducer(state.profile, action),
      };
    case 'UPDATE_PROFILE_SUCCESS':
      return {
        ...state,
        profile: profileReducer(state.profile, action),
      };
    case 'UPDATE_PROFILE_ERROR':
      return {
        ...state,
        profile: profileReducer(state.profile, action),
      };
    case 'UPDATE_PROFILE_USER_NAME':
      return {
        ...state,
        profile: profileReducer(state.profile, action),
      };
    case 'UPDATE_PROFILE_EMAIL':
      return {
        ...state,
        profile: profileReducer(state.profile, action),
      };
    case 'UPDATE_PROFILE_IMAGE_URL':
      return {
        ...state,
        profile: profileReducer(state.profile, action),
      };
    default:
      return state;
  }
};
