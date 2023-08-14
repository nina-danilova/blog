const initialState = {
  loading: false,
  error: null,
  articleList: [],
  articlesCount: 0,
  currentPage: 1,
};

// eslint-disable-next-line default-param-last
export const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_ARTICLES_START':
      return {
        ...state,
        loading: true,
        articleList: [],
        error: null,
      };
    case 'LOAD_ARTICLES_SUCCESS':
      return {
        ...state,
        loading: false,
        articleList: action.articles,
        articlesCount: action.articlesCount,
      };
    case 'LOAD_ARTICLES_ERROR':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case 'CHANGE_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.page,
      };
    default:
      return state;
  }
};
