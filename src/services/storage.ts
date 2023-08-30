export const getFromStorage = (key: string) => {
  return localStorage.getItem(key);
};

export const setToStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const removeFromStorage = (key: string) => {
  localStorage.removeItem(key);
};
