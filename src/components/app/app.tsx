import React from 'react';

import { PageWrapper } from '../layout/page-wrapper';
import { store } from '../../redux/store';
import { getArticles } from '../../redux/action-creators/articles';

import './app.module.scss';

export const App = () => {
  store.dispatch(getArticles());
  return <PageWrapper />;
};
