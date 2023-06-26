import { getData } from '../../services/api';

export const loadArticle = () => {
  return {
    type: 'LOAD_ARTICLE',
  };
};

export const loadArticleSuccess = (json) => {
  return {
    type: 'LOAD_ARTICLE_SUCCESS',
    article: json.article,
  };
};

export const loadArticleError = (error) => {
  return {
    type: 'LOAD_ARTICLE_ERROR',
    error: error.body, // или error.errors.body
  };
};

export const setSlug = (slug) => {
  return {
    type: 'SET_SLUG',
    slug,
  };
};

export const getArticle = (slug) => {
  return async (dispatch) => {
    try {
      dispatch(setSlug(slug));
      dispatch(loadArticle());
      const response = await getData(`https://blog.kata.academy/api/articles/${slug}`);
      dispatch(loadArticleSuccess(response));
    } catch (err) {
      dispatch(loadArticleError(err));
    }
  };
};
