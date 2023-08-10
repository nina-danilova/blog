const initialState = {
  userName: '',
  email: '',
  bio: '',
  image: '',
  loadingProfile: false,
  loadProfileError: null,
  updatingProfile: false,
  updateProfileError: null,
};

// eslint-disable-next-line default-param-last
export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_PROFILE_START':
      return {
        ...state,
        loadingProfile: true,
        loadProfileError: null,
      };
    case 'LOAD_PROFILE_SUCCESS':
      return {
        ...state,
        loadingProfile: false,
        userName: action.userName,
        email: action.email,
        bio: action.bio,
        image: action.image,
      };
    case 'LOAD_PROFILE_ERROR':
      return {
        ...state,
        loadingProfile: false,
        loadProfileError: action.error,
      };
    case 'UPDATE_PROFILE_START':
      return {
        ...state,
        updatingProfile: true,
        updateProfileError: null,
      };
    case 'UPDATE_PROFILE_SUCCESS':
      return {
        ...state,
        updatingProfile: false,
        userName: action.userName,
        image: action.image,
        bio: action.bio,
        email: action.email,
      };
    case 'UPDATE_PROFILE_ERROR':
      return {
        ...state,
        updatingProfile: false,
        updateProfileError: action.error,
      };
    case 'UPDATE_PROFILE_USER_NAME':
      return {
        ...state,
        userName: action.value,
      };
    case 'UPDATE_PROFILE_EMAIL':
      return {
        ...state,
        email: action.value,
      };
    case 'UPDATE_PROFILE_IMAGE_URL':
      return {
        ...state,
        image: action.value,
      };
    default:
      return state;
  }
};
