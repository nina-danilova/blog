import { store } from '../store';

export const loadProfileStart = () => {
  return {
    type: 'LOAD_PROFILE_START',
  };
};

export const loadProfileSuccess = (json) => {
  return {
    type: 'LOAD_PROFILE_SUCCESS',
    userName: json.user.userName,
    email: json.user.email,
    bio: json.user.bio,
    image: json.user.image,
  };
};

export const loadProfileError = (text) => {
  return {
    type: 'LOAD_PROFILE_ERROR',
    error: text,
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
    userName: json.user.userName,
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

export const loadProfile = () => {
  /* store.dispatch(loadProfileStart()); */
  /* store.dispatch(
    loadProfileSuccess({
      userName: 'json.user.userName',
      email: 'json.user.email',
      bio: 'json.user.bio',
      image: 'json.user.image',
    })
  );
  store.dispatch(loadProfileError('error loading profile')); */
};

export const updateProfileUserName = (value) => {
  return {
    type: 'UPDATE_PROFILE_USER_NAME',
    value,
  };
};

export const updateProfileEmail = (value) => {
  return {
    type: 'UPDATE_PROFILE_EMAIL',
    value,
  };
};

export const updateProfileImageUrl = (value) => {
  return {
    type: 'UPDATE_PROFILE_IMAGE_URL',
    value,
  };
};
