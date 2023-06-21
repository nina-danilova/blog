import React from 'react';

import { PageWrapper } from '../layout/page-wrapper';
import { store } from '../../redux/store';
import { getArticles } from '../../redux/action-creators/articles';

import './app.module.scss';

export const App = () => {
  const state = store.getState();
  const currentPageForArticles = state.articles.currentPage;
  store.dispatch(getArticles(currentPageForArticles));
  return <PageWrapper />;
};
