import React, { useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { Alert, Spin } from 'antd';

import { useAppSelector, useAppDispatch } from 'hooks/hooks';
import { ArticleCardFullView } from 'components/blocks/article-card-full-view';
import { setSlug } from 'redux-toolkit/article/articleSlice';
import { loadArticle } from 'redux-toolkit/article/articleThunks';
import { linkPaths } from 'utilities/constants';

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
  const { pathToSignIn } = linkPaths;
  const history = useHistory();
  const dispatch = useAppDispatch();
  const article = useAppSelector((state) => state.viewingArticle);
  const isLoading = useAppSelector((state) => state.viewingArticle.loading);
  const loadArticleError = useAppSelector((state) => state.viewingArticle.error);
  // const noAuthError = useAppSelector((state) => state.viewingArticle.error?.cause?.errors.error.status);
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
  useEffect(() => {
    dispatch(setSlug(id));
    if (!isLoading) {
      dispatch(loadArticle({ id }));
    }
    /* if (noAuthError) {
      history.push(pathToSignIn);
    } */
  }, [id]);
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
