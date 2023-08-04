import { getData } from '../../services/api';
import { store } from '../store';

export const loadArticles = () => {
  return {
    type: 'LOAD_ARTICLES',
  };
};

export const loadArticlesSuccess = (json) => {
  return {
    type: 'LOAD_ARTICLES_SUCCESS',
    articles: json.articles,
    articlesCount: json.articlesCount,
  };
};

export const loadArticlesError = (error) => {
  return {
    type: 'LOAD_ARTICLES_ERROR',
    error: error.errors.body,
  };
};

export const changeCurrentPage = (newPage) => {
  return {
    type: 'CHANGE_CURRENT_PAGE',
    page: newPage,
  };
};

const addIdToArticles = (articleList) => {
  let id = 0;
  const articleListWithId = articleList.map((article) => {
    const articleWithId = { ...article, id };
    id += 1;
    return articleWithId;
  });
  return articleListWithId;
};

const getOffset = (page) => {
  return (page - 1) * 20;
};

export const getArticles = (currentPage) => {
  const offset = getOffset(currentPage);
  return async (dispatch) => {
    const { articles } = store.getState();
    if (articles.loading) {
      return;
    }
    try {
      dispatch(loadArticles());
      const response = await getData(`https://blog.kata.academy/api/articles?limit=20&offset=${offset}`);
      const responseBody = await response.json();
      const preparedArticleList = addIdToArticles(responseBody.articles);
      const preparedResponse = { ...responseBody, articles: preparedArticleList };
      dispatch(loadArticlesSuccess(preparedResponse));
    } catch (err) {
      dispatch(loadArticlesError(err));
    }
  };
};
