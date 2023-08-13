import { profileReducer } from './profileReducer';

const initialState = {
  registering: false,
  registerError: null,
  loggingIn: false,
  loginError: null,
  authorized: false,
  profile: undefined,
};

// eslint-disable-next-line default-param-last
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOG_OUT':
      return {
        ...state,
        authorized: false,
      };
    case 'USER_REGISTER_START':
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
        registerErrorObject: action.response,
      };
    case 'USER_LOGIN_START':
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
      };
    case 'USER_LOGIN_ERROR':
      return {
        ...state,
        loggingIn: false,
        loginError: action.error,
        loginErrorObject: action.response,
      };
    case 'LOAD_PROFILE_START':
    case 'LOAD_PROFILE_SUCCESS':
    case 'LOAD_PROFILE_ERROR':
    case 'UPDATE_PROFILE_START':
    case 'UPDATE_PROFILE_SUCCESS':
    case 'UPDATE_PROFILE_ERROR':
    case 'UPDATE_PROFILE_FORM_USER_NAME':
    case 'UPDATE_PROFILE_FORM_EMAIL':
    case 'UPDATE_PROFILE_FORM_IMAGE_URL':
      return {
        ...state,
        profile: profileReducer(state.profile, action),
      };
    default:
      return state;
  }
};
