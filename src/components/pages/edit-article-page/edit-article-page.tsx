import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Alert, Spin } from 'antd';

import { setEditStatus, setSlug } from '../../../redux-toolkit/article/articleSlice';
import { loadArticle } from '../../../redux-toolkit/article/articleThunks';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import styles from '../article-page/article-page.module.scss';
import { ArticleForm } from '../new-article-page/article-form';

type EditArticlePageProps = {
  match: {
    params: {
      id: string;
    };
  };
};
const EditArticlePage: React.FC<EditArticlePageProps> = ({ match }) => {
  const { params } = match;
  const { id } = params;
  const dispatch = useAppDispatch();
  const article = useAppSelector((state) => state.viewingArticle);
  const isLoading = useAppSelector((state) => state.viewingArticle.loading);
  const loadArticleError = useAppSelector((state) => state.viewingArticle.error);
  const loadSpinner = isLoading ? <Spin /> : null;
  const errorMessage =
    loadArticleError !== null ? (
      <Alert
        type="error"
        closable={false}
        message="Editing article loading error. Please update."
      />
    ) : null;
  const noDataMessage =
    !isLoading && article === null ? (
      <Alert
        type="info"
        closable={false}
        message="There is no data. Please update."
      />
    ) : null;
  useEffect(() => {
    dispatch(setEditStatus(true));
    dispatch(setSlug(id));
    if (!isLoading) {
      dispatch(loadArticle({ id }));
    }
  }, [id]);
  return (
    <>
      {loadSpinner}
      {errorMessage}
      {noDataMessage}
      <h1 className={styles['visually-hidden']}>Blog - Editing article</h1>
      <ArticleForm />
    </>
  );
};

export const EditArticlePageWithRouter = withRouter(EditArticlePage);
