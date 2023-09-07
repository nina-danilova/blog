export enum actions {
  LOAD_ARTICLE_START = 'LOAD_ARTICLE_START',
  LOAD_ARTICLE_SUCCESS = 'LOAD_ARTICLE_SUCCESS',
  LOAD_ARTICLE_ERROR = 'LOAD_ARTICLE_ERROR',
  SET_SLUG = 'SET_SLUG',
  CREATE_ARTICLE = 'CREATE_ARTICLE',
  LOAD_ARTICLES_START = 'LOAD_ARTICLES_START',
  LOAD_ARTICLES_SUCCESS = 'LOAD_ARTICLES_SUCCESS',
  LOAD_ARTICLES_ERROR = 'LOAD_ARTICLES_ERROR',
  CHANGE_CURRENT_PAGE = 'CHANGE_CURRENT_PAGE',
  LOAD_PROFILE_START = 'LOAD_PROFILE_START',
  LOAD_PROFILE_SUCCESS = 'LOAD_PROFILE_SUCCESS',
  LOAD_PROFILE_ERROR = 'LOAD_PROFILE_ERROR',
  UPDATE_PROFILE_START = 'UPDATE_PROFILE_START',
  UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_ERROR = 'UPDATE_PROFILE_ERROR',
  UPDATE_PROFILE_FORM_USER_NAME = 'UPDATE_PROFILE_FORM_USER_NAME',
  UPDATE_PROFILE_FORM_EMAIL = 'UPDATE_PROFILE_FORM_EMAIL',
  UPDATE_PROFILE_FORM_IMAGE_URL = 'UPDATE_PROFILE_FORM_IMAGE_URL',
  USER_LOG_OUT = 'USER_LOG_OUT',
  USER_REGISTER_START = 'USER_REGISTER_START',
  USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS',
  USER_REGISTER_ERROR = 'USER_REGISTER_ERROR',
  USER_LOGIN_START = 'USER_LOGIN_START',
  USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
  USER_LOGIN_ERROR = 'USER_LOGIN_ERROR',
}

export enum linkPaths {
  pathToSignIn = '/sign-in',
  pathToSignUp = '/sign-up',
  pathToProfile = '/profile',
  pathToNewArticle = '/new-article',
  pathToHome = '/',
  pathToArticles = '/articles/',
  pathToArticle = '/articles/:id',
}

export const apiBaseUrl = 'https://blog.kata.academy/api';
export const usernameRegEx = /^[a-z0-9]*$/;
export const emailRegEx = /^(?!.*@.*@.*$)(?!.*@.*--.*\..*$)(?!.*@.*-\..*$)(?!.*@.*-$)((.*)?@.+(\..{1,11})?)$/;
export const passwordRegEx = /^[a-z0-9]*$/;
export const urlRegEx =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
export const messageRequired = 'Field is required';
export const messagePattern = 'Field is not correct';
export const messageUsernameMinLength = '3 or more symbols are required';
export const messageUsernameMaxLength = '20 or less symbols are required';

export const messagePasswordMinLength = '6 or more symbols are required';
export const messagePasswordMaxLength = '40 or less symbols are required';

export const messageTitleMaxLength = '200 or less symbols are required';

export const messageTagMaxLength = '100 or less symbols are required';
export const messageNotTheSame = 'Passwords are not the same';
