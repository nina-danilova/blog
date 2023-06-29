import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Alert, Spin } from 'antd';

import { ArticleCardFullView } from '../../blocks/article-card-full-view';
import { getArticle } from '../../../redux/action-creators/article';
import { store } from '../../../redux/store';
import { RootState } from '../../../redux/reducers';

import styles from './article-page.module.scss';

const ArticlePage = ({ match }) => {
  const { params } = match;
  useEffect(() => {
    store.dispatch(getArticle(params.id));
  }, []);
  const article = useSelector((state: RootState) => state.viewingArticle);
  const isLoading = useSelector((state: RootState) => state.viewingArticle.loading);
  const loadArticleError = useSelector((state: RootState) => state.viewingArticle.error);
  const loadSpinner = isLoading ? <Spin /> : null;
  const errorMessage =
    loadArticleError !== null ? (
      <Alert
        type="error"
        closable={false}
        message="Article loading error. Please update."
      />
    ) : null;
  const noDataMessage =
    !isLoading && article === null ? (
      <Alert
        type="info"
        closable={false}
        message="There is no relevant data for you. Please update."
      />
    ) : null;
  return (
    <>
      {loadSpinner}
      {errorMessage}
      {noDataMessage}
      <h1 className={styles['visually-hidden']}>Blog - Article</h1>
      <ArticleCardFullView />
    </>
  );
};

export default withRouter(ArticlePage);