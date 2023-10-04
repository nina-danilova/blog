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
