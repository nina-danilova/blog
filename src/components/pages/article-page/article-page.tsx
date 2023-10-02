import React, { useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { Alert, Spin } from 'antd';

import { useAppSelector, useAppDispatch } from 'hooks/hooks';
import { setSlug } from 'redux-toolkit/article/articleSlice';
import { loadArticle } from 'redux-toolkit/article/articleThunks';
import { linkPaths } from 'utilities/constants';

import styles from './article-page.module.scss';
import { ArticleCardFullView } from './article-card-full-view';

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
  const { pathToSignIn } = linkPaths;
  const history = useHistory();
  const dispatch = useAppDispatch();
  const article = useAppSelector((state) => state.viewingArticle);
  const isLoading = useAppSelector((state) => state.viewingArticle.loading);
  const articleError = useAppSelector((state) => state.viewingArticle.error);
  const loadSpinner = isLoading ? <Spin /> : null;
  const errorMessage =
    articleError !== null ? (
      <Alert
        type="error"
        closable={false}
        message={articleError?.message}
      />
    ) : null;
  const noDataMessage =
    !isLoading && article === null ? (
      <Alert
        type="info"
        closable={false}
        message="There is no data for you. Please update."
      />
    ) : null;
  useEffect(() => {
    dispatch(setSlug(id));
    if (!isLoading) {
      dispatch(loadArticle({ id }));
    }
  }, [id]);
  useEffect(() => {
    if (
      articleError &&
      articleError.cause &&
      articleError.cause.errors &&
      articleError.cause.errors.error &&
      articleError.cause.errors.error.status &&
      articleError.cause.errors.error.status === 401
    ) {
      history.push(pathToSignIn);
    }
  }, [articleError]);
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
