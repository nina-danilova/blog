type User = {
  email: string;
  token: string;
};

export const getFromStorage = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const setToStorage = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

export const removeFromStorage = (key: string): void => {
  localStorage.removeItem(key);
};

export const getLoginToken = (email: string | null = null): string | null => {
  let lastEmail = email;
  if (!lastEmail) {
    lastEmail = getFromStorage('lastEmail');
  }
  return getFromStorage(`${lastEmail}-login-token`);
};

export const setLoginInfo = (user: User): void => {
  const { email, token } = user;
  setToStorage(`${email}-login-token`, token);
  setToStorage('lastEmail', email);
};

export const clearLoginInfo = (): void => {
  removeFromStorage('lastEmail');
};

export const hasAuthStatus = (): boolean => {
  return getFromStorage('isUserAuthorized') === 'true';
};

export const setAuthStatus = (isAuthorized: boolean): void => {
  setToStorage('isUserAuthorized', `${isAuthorized}`);
  if (!isAuthorized) {
    clearLoginInfo();
  }
};

export const getRegisterToken = (email: string): string | null => {
  return getFromStorage(`${email}-token`);
};

export const setRegisterInfo = (user: User): void => {
  const { email, token } = user;
  setToStorage(`${email}-token`, token);
};
