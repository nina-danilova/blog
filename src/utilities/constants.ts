export enum linkPaths {
  pathToSignIn = '/sign-in',
  pathToSignUp = '/sign-up',
  pathToProfile = '/profile',
  pathToNewArticle = '/new-article',
  pathToHome = '/',
  pathToArticles = '/articles/',
  pathToArticle = '/articles/:id',
  pathToEditArticle = '/articles/:id/edit',
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
export const messageTagMaxLength = '20 or less symbols are required';
export const messageNotTheSame = 'Passwords are not the same';
