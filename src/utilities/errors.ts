type ErrorCause = {
  errors?: {
    message?: string;
    error?: {
      status?: number;
    };
  };
};

export type ServiceError = {
  name: string;
  message: string;
  cause: ErrorCause | null;
};

export const createError = (message: string, body: ErrorCause | null = null): ServiceError => {
  return {
    name: 'Error',
    message,
    cause: body,
  };
};

export const getValidationResultErrorMessage = (errorObject: {
  name?: string;
  message?: string;
  cause?: ErrorCause | null;
}): string | null => {
  if (errorObject && errorObject.cause && errorObject.cause.errors) {
    const object = { ...errorObject.cause.errors };
    const entries = Object.entries(object);
    const message = entries.map(([name, value]) => `${name} ${value}`).join(' ');
    return message;
  }
  return null;
};
