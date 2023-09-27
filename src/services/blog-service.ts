import { apiBaseUrl } from 'utilities/constants';
import { createError } from 'utilities/errors';
import { Article } from 'redux-toolkit/article/articleSlice';
import { Profile } from 'redux-toolkit/profile/profileSlice';

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

export const getArticle = (id: string, token: null | string = null): Promise<Article> => {
  const url = `${apiBaseUrl}/articles/${id}`;
  return fetch(url, {
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
      if (error.message) {
        throw error;
      }
      throw createError(error);
    });
};

export const getProfile = (token: string): Promise<Profile> => {
  const url = `${apiBaseUrl}/user`;
  return fetch(url, {
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
          `Load profile error, code ${response.status.toString()} - error after API answer`,
          errorResponse
        );
      },
      (err) => {
        throw createError('Load profile error while getting data through API', err);
      }
    )
    .then((response) => {
      if (response.user) {
        return response.user;
      }
      throw createError('Unknown error of loading profile');
    })
    .catch((error) => {
      if (error.message) {
        throw error;
      }
      throw createError(error);
    });
};

const getOffset = (page: number): number => {
  return (page - 1) * 20;
};

type ArticleWithIdList = (Article & { id: number })[];

const addIdToArticles = (articleList: Article[]): ArticleWithIdList => {
  let id = 0;
  return articleList.map((article) => {
    const articleWithId = { ...article, id };
    id += 1;
    return articleWithId;
  });
};

export type ArticlesWithId = {
  articles: ArticleWithIdList;
  articlesCount: number;
};

export const getArticles = (currentPage: number): Promise<ArticlesWithId> => {
  const offset = getOffset(currentPage);
  const url = `${apiBaseUrl}/articles?limit=20&offset=${offset}`;
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  })
    .then(
      async (response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        const errorResponse = await response.json();
        throw createError(
          `Load articles error, code ${response.status.toString()} - error after API answer`,
          errorResponse
        );
      },
      (err) => {
        throw createError('Load articles error while getting data through API', err);
      }
    )
    .then((response) => {
      if (response.articles) {
        const preparedArticleList = addIdToArticles(response.articles);
        return { ...response, articles: preparedArticleList };
      }
      throw createError('Unknown error of loading articles');
    })
    .catch((error) => {
      if (error.message) {
        throw error;
      }
      throw createError(error);
    });
};
