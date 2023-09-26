export const createError = (message: string, body: Error | object | null = null): Error => {
  return {
    name: 'Error',
    message,
    cause: body,
  };
};
