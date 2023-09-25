export const createError = (message: string, body?: Error): Error => {
  return {
    name: 'Error',
    message,
    cause: body,
  };
};
