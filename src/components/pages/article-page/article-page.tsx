import React, { useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Spin } from 'antd';

import { ArticleCardFullView } from 'components/blocks/article-card-full-view';
import { setSlug } from 'redux-toolkit/article/articleSlice';
import { loadArticle } from 'redux-toolkit/article/articleThunks';
import { RootState } from 'redux-toolkit/index';

import styles from './article-page.module.scss';

type ArticlePageProps = {
  match: {
    params: {
      id: string;
    };
  };
};

const ArticlePage: React.FC<ArticlePageProps> = ({ match }) => {
  const { params } = match;
  const { id } = params;
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSlug(id));
    dispatch(loadArticle({ id, history }));
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

export const ArticlePageWithRouter = withRouter(ArticlePage);
