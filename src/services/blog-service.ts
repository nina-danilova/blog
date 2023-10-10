import { apiBaseUrl } from 'utilities/constants';
import { createError, ServiceError } from 'utilities/errors';
import { Article } from 'redux-toolkit/article/articleSlice';
import { Profile } from 'redux-toolkit/profile/profileSlice';
import { UpdatedProfile } from 'redux-toolkit/profile/profileThunks';

import { setLoginInfo, setRegisterInfo } from './storage-service';

export const handleError = async (error: ServiceError | string) => {
  if (typeof error === 'object') {
    throw error;
  }
  throw createError(error);
};

const handleResponse = async (response: Response, functionName: string): Promise<any> => {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  }
  const errorResponse = await response.json();
  throw createError(
    `${functionName} function error, code ${response.status.toString()} - error after API answer`,
    errorResponse
  );
};

type GetArticleProps = {
  id: string;
  token: string | null;
};

export const getArticle = ({ id, token }: GetArticleProps): Promise<Article> => {
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
        return handleResponse(response, 'Load article');
      },
      (err) => {
        throw createError('Load article error while getting data through API', { ...err });
      }
    )
    .then((response) => {
      if (response.article) {
        return response.article;
      }
      throw createError('Unknown error of loading article');
    })
    .catch((error) => {
      return handleError(error);
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
        return handleResponse(response, 'Load profile');
      },
      (err) => {
        throw createError('Load profile error while getting data through API', { ...err });
      }
    )
    .then((response) => {
      if (response.user) {
        return response.user;
      }
      throw createError('Unknown error of loading profile');
    })
    .catch((error) => {
      return handleError(error);
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
        return handleResponse(response, 'Set profile');
      },
      (err) => {
        throw createError('Set profile error while updating data through API', { ...err });
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
      return handleError(error);
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

type GetArticlesProps = {
  currentPage: number;
  token: string | null;
};

export const getArticles = ({ currentPage, token }: GetArticlesProps): Promise<ArticlesWithId> => {
  const offset = getOffset(currentPage);
  const url = `${apiBaseUrl}/articles?limit=20&offset=${offset}`;
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
  })
    .then(
      async (response) => {
        return handleResponse(response, 'Load articles');
      },
      (err) => {
        throw createError('Load articles error while getting data through API', { ...err });
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
      return handleError(error);
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
        return handleResponse(response, 'User register');
      },
      (err) => {
        throw createError('User register error while sending data through API', { ...err });
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
      return handleError(error);
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
        return handleResponse(response, 'User login');
      },
      (err) => {
        throw createError('User login error while sending data through API', { ...err });
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
      return handleError(error);
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
        return handleResponse(response, 'Send article');
      },
      (err) => {
        throw createError('Send article error while sending data through API', { ...err });
      }
    )
    .then((response) => {
      if (response.article) {
        return response.article;
      }
      throw createError('Unknown error of sending article');
    })
    .catch((error) => {
      return handleError(error);
    });
};

type UpdateArticleProps = {
  slug: string;
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
export const updateArticleOnServer = ({ slug, data, token }: UpdateArticleProps): Promise<Article> => {
  const url = `${apiBaseUrl}/articles/${slug}`;
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
        return handleResponse(response, 'Update article');
      },
      (err) => {
        throw createError('Update article error while sending data through API', { ...err });
      }
    )
    .then((response) => {
      if (response.article) {
        return response.article;
      }
      throw createError('Unknown error of updating article');
    })
    .catch((error) => {
      return handleError(error);
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
        return handleResponse(response, 'Delete article');
      },
      (err) => {
        throw createError('Delete article error while deleting data through API', { ...err });
      }
    )
    .catch((error) => {
      return handleError(error);
    });
};

type SendFavoritedSlugProps = {
  slug: string;
  token: string;
};

export const sendFavoritedSlug = ({ slug, token }: SendFavoritedSlugProps): Promise<Article> => {
  const url = `${apiBaseUrl}/articles/${slug}/favorite`;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
  })
    .then(
      async (response) => {
        return handleResponse(response, 'Send favorited slug');
      },
      (err) => {
        throw createError('Send favorited slug error while sending data through API', { ...err });
      }
    )
    .then((response) => {
      if (response.article) {
        return response.article;
      }
      throw createError('Unknown error of sending favorited slug');
    })
    .catch((error) => {
      return handleError(error);
    });
};

type SendUnfavoritedSlugProps = {
  slug: string;
  token: string;
};

export const sendUnfavoritedSlug = ({ slug, token }: SendUnfavoritedSlugProps): Promise<Article> => {
  const url = `${apiBaseUrl}/articles/${slug}/favorite`;
  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
  })
    .then(
      async (response) => {
        return handleResponse(response, 'Send unfavorited slug');
      },
      (err) => {
        throw createError('Send unfavorited slug error while sending data through API', { ...err });
      }
    )
    .then((response) => {
      if (response.article) {
        return response.article;
      }
      throw createError('Unknown error of sending unfavorited slug');
    })
    .catch((error) => {
      return handleError(error);
    });
};
