import { getData } from 'services/api';
import { apiBaseUrl } from 'utilities/constants';

export const loadArticleStart = () => {
  return {
    type: 'LOAD_ARTICLE_START',
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
    error: error.message,
    response: error.response,
  };
};

export const setSlug = (slug) => {
  return {
    type: 'SET_SLUG',
    slug,
  };
};

export const loadArticle = (slug, history) => {
  return (dispatch, getState) => {
    const { viewingArticle } = getState();
    if (viewingArticle.loading) {
      return;
    }
    dispatch(setSlug(slug));
    dispatch(loadArticleStart());
    getData(`${apiBaseUrl}/articles/${slug}`)
      .then(
        (response) => {
          if (response.status === 401) {
            history.push('/sign-in');
          } else if ((response.status >= 200 && response.status < 300) || response.status === 422) {
            return response.json();
          }
          const error = new Error(`Load article error, code ${response.status.toString()} - error after API answer`);
          error.response = response;
          throw error;
        },
        (err) => {
          // handle error from promise-api
          const error = new Error('Load article error while sending data through API');
          error.response = err;
          throw error;
        }
      )
      .then((response) => {
        if (response.errors) {
          const errors = Object.entries(response.errors);
          const [errorName, errorMessage] = errors[0];
          const error = new Error(`Load article error - ${errorName} ${errorMessage}`);
          error.response = response;
          throw error;
        }
        if (response.article) {
          dispatch(loadArticleSuccess(response));
        }
      })
      .catch((error) => {
        dispatch(loadArticleError(error));
      });
  };
};

type CreateArticleProps = {
  event;
  history;
  data;
};

export const createArticle = ({ event, history, data }: CreateArticleProps) => {
  console.log(event, history, data);
  return {
    type: 'CREATE_ARTICLE',
    event,
    history,
    data,
  };
};
