import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { articlesSliceReducer } from 'redux-toolkit/articles/articlesSlice';
import { articleSLiceReducer } from 'redux-toolkit/article/articleSlice';
import { userSliceReducer } from 'redux-toolkit/user/userSlice';
import { profileSLiceReducer } from 'redux-toolkit/profile/profileSlice';

const rootReducer = combineReducers({
  articles: articlesSliceReducer,
  viewingArticle: articleSLiceReducer,
  user: userSliceReducer,
  profile: profileSLiceReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
