import { apiBaseUrl } from 'utilities/constants';
import { createError } from 'utilities/errors';
import { Article } from 'redux-toolkit/article/articleSlice';
import { Profile } from 'redux-toolkit/profile/profileSlice';
import { UpdatedProfile } from 'redux-toolkit/profile/profileThunks';

import { setLoginInfo, setRegisterInfo } from './storage-service';

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

type UpdateProfileProps = {
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

export const setProfile = async ({ data, token = null }: UpdateProfileProps): Promise<UpdatedProfile> => {
  const url = `${apiBaseUrl}/user`;
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then(
      async (response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        const errorResponse = await response.json();
        throw createError(
          `Set profile error, code ${response.status.toString()} - error after API answer`,
          errorResponse
        );
      },
      (err) => {
        throw createError('Set profile error while updating data through API', err);
      }
    )
    .then((response) => {
      if (response.user) {
        setLoginInfo(response.user);
        return response.user;
      }
      throw createError('Unknown error of setting profile');
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

type SendRegisterInfoProps = {
  data: {
    user: {
      username: string;
      email: string;
      password: string;
    };
  };
};

export const sendRegisterInfo = async ({ data }: SendRegisterInfoProps): Promise<void> => {
  const url = `${apiBaseUrl}/users`;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  })
    .then(
      async (response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        const errorResponse = await response.json();
        throw createError(
          `User register error, code ${response.status.toString()} - error after API answer`,
          errorResponse
        );
      },
      (err) => {
        throw createError('User register error while sending data through API', err);
      }
    )
    .then((response) => {
      if (response.user) {
        setRegisterInfo(response.user);
      } else {
        throw createError('Unknown error of registering user');
      }
    })
    .catch((error) => {
      if (error.message) {
        throw error;
      }
      throw createError(error);
    });
};

type SendLoginInfoProps = {
  data: {
    user: {
      email: string;
      password: string;
    };
  };
  token: string;
};

export const sendLoginInfo = async ({ data, token }: SendLoginInfoProps): Promise<Profile> => {
  const url = `${apiBaseUrl}/users/login`;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then(
      async (response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        const errorResponse = await response.json();
        throw createError(
          `User login error, code ${response.status.toString()} - error after API answer`,
          errorResponse
        );
      },
      (err) => {
        throw createError('User login error while sending data through API', err);
      }
    )
    .then((response) => {
      if (response.user) {
        setLoginInfo(response.user);
        return response.user;
      }
      throw createError('Unknown error of logging-in user');
    })
    .catch((error) => {
      if (error.message) {
        throw error;
      }
      throw createError(error);
    });
};

type SendArticleProps = {
  data: {
    article: {
      title: string;
      description: string;
      body: string;
      tagList: string[];
    };
  };
  token: string;
};

export const sendArticle = ({ data, token }: SendArticleProps): Promise<Article> => {
  const url = `${apiBaseUrl}/articles`;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then(
      async (response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        const errorResponse = await response.json();
        throw createError(
          `Send article error, code ${response.status.toString()} - error after API answer`,
          errorResponse
        );
      },
      (err) => {
        throw createError('Send article error while sending data through API', err);
      }
    )
    .then((response) => {
      if (response.article) {
        return response.article;
      }
      throw createError('Unknown error of sending article');
    })
    .catch((error) => {
      if (error.message) {
        throw error;
      }
      throw createError(error);
    });
};

type DeleteArticleFromServerProps = {
  slug: string;
  token: string;
};

export const deleteArticleFromServer = ({ slug, token }: DeleteArticleFromServerProps): Promise<void> => {
  const url = `${apiBaseUrl}/articles/${slug}`;
  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
  })
    .then(
      async (response) => {
        if (response.status >= 200 && response.status < 300) {
          return;
        }
        const errorResponse = await response.json();
        throw createError(
          `Delete article error, code ${response.status.toString()} - error after API answer`,
          errorResponse
        );
      },
      (err) => {
        throw createError('Delete article error while deleting data through API', err);
      }
    )
    .catch((error) => {
      if (error.message) {
        throw error;
      }
      throw createError(error);
    });
};
