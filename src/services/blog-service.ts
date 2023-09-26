import { apiBaseUrl } from '../utilities/constants';
import { createError } from '../utilities/errors';
import { Article } from '../redux-toolkit/article/articleSlice';

export const getData = async (url: string, token: null | string = null) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
  });
};

type UpdateDataProps = {
  url: string;
  data: {
    user: {
      email: string;
      username: string;
      image: string | null;
      password: string;
    };
  };
  token: null | string;
};

export const updateData = async ({ url, data, token = null }: UpdateDataProps) => {
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(data),
  });
};

type SendDataProps = {
  url: string;
  data: {
    user: {
      username?: string;
      email: string;
      password: string;
    };
  };
  token?: null | string;
};

export const sendData = async ({ url, data, token = null }: SendDataProps) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(data),
  });
};

// ----------------------------------------------------------------------------

export const getArticle = (id: string, token: null | string = null): Promise<Article | Error> => {
  return fetch(`${apiBaseUrl}/articles/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
  })
    .then(
      async (response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        const errorResponse = await response.json();
        throw createError(
          `Load article error, code ${response.status.toString()} - error after API answer`,
          errorResponse
        );
      },
      (err) => {
        throw createError('Load article error while getting data through API', err);
      }
    )
    .then((response) => {
      if (response.article) {
        return response.article;
      }
      throw createError('Unknown error of loading article');
    })
    .catch((error) => {
      /* if (error.cause.errors) {
        const errors = Object.entries(error.cause.errors);
        const [errorName, errorMessage] = errors[0];
        return error; // { ...error, message: `Load article error - ${errorName} ${errorMessage}` };
      } */
      if (error.message) {
        return error;
      }
      return createError(error);
    });
};
