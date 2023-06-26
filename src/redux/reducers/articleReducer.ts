const initialState = {
  loading: false,
  error: null,
  article: null,
  slug: 'If-we-quantify-the-alarm-we-can-get-to-the-FTP-pixel-through-the-online-SSL-interface!-120863',
};

// eslint-disable-next-line default-param-last
export const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_ARTICLE':
      return {
        ...state,
        loading: true,
        article: null,
        error: null,
      };
    case 'LOAD_ARTICLE_SUCCESS':
      return {
        ...state,
        loading: false,
        article: action.article,
      };
    case 'LOAD_ARTICLE_ERROR':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case 'SET_SLUG':
      return {
        ...state,
        slug: action.slug,
      };
    default:
      return state;
  }
};
