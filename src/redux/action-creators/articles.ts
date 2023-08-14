import { getData } from '../../services/api';
import { store } from '../store';

export const loadArticlesStart = () => {
  return {
    type: 'LOAD_ARTICLES_START',
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

export const loadArticles = (currentPage, history) => {
  const offset = getOffset(currentPage);
  return (dispatch) => {
    const { articles } = store.getState();
    if (articles.loading) {
      return;
    }
    dispatch(loadArticlesStart());
    getData(`https://blog.kata.academy/api/articles?limit=20&offset=${offset}`)
      .then(
        function (response) {
          if (response.status === 401) {
            history.push('/sign-in');
          } else if ((response.status >= 200 && response.status < 300) || response.status === 422) {
            return response.json();
          }
          const error = new Error(`Load articles error, code ${response.status.toString()} - error after API answer`);
          error.response = response;
          throw error;
        },
        function (err) {
          // handle error from promise-api
          const error = new Error('Load articles error while sending data through API');
          error.response = err;
          throw error;
        }
      )
      .then((response) => {
        if (response.errors) {
          const errors = Object.entries(response.errors);
          const [errorName, errorMessage] = errors[0];
          const error = new Error(`Load articles error - ${errorName} ${errorMessage}`);
          error.response = response;
          throw error;
        }
        if (response.articles) {
          const preparedArticleList = addIdToArticles(response.articles);
          const preparedResponse = { ...response, articles: preparedArticleList };
          dispatch(loadArticlesSuccess(preparedResponse));
        }
      })
      .catch(function (error) {
        dispatch(loadArticlesError(error));
      });
  };
};
