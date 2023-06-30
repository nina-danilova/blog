import { combineReducers } from 'redux';

import { articlesReducer } from './articlesReducer';
import { articleReducer } from './articleReducer';
import { userReducer } from './userReducer';

export const rootReducer = combineReducers({
  articles: articlesReducer,
  viewingArticle: articleReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
