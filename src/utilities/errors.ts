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
    name: 'Service error',
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
    return entries.map(([name, value]) => `${name} ${value}`).join(' ');
  }
  return null;
};

export const hasError401 = (errorObject: ServiceError | null) => {
  if (errorObject !== null) {
    return errorObject.cause?.errors?.error?.status === 401;
  }
  return false;
};

export const isErrorServiceError = (error: unknown | ServiceError): error is ServiceError => {
  return typeof error === 'object' && error !== null && 'name' in error && error.name === 'Service error';
};
