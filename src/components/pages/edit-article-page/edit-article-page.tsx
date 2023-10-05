import React, { useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { Alert } from 'antd';

import { setEditStatus, setSlug } from 'redux-toolkit/article/articleSlice';
import { loadArticle } from 'redux-toolkit/article/articleThunks';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import styles from 'components/pages/article-page/article-page.module.scss';
import { ArticleForm } from 'components/shared/article-form';

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
  const history = useHistory();
  const dispatch = useAppDispatch();
  const userName = useAppSelector((state) => state.profile.userName);
  const viewingArticle = useAppSelector((state) => state.viewingArticle);
  const article = useAppSelector((state) => state.viewingArticle.article);
  const isLoading = useAppSelector((state) => state.viewingArticle.loading);
  const loadArticleError = useAppSelector((state) => state.viewingArticle.error);
  const errorMessage =
    loadArticleError !== null ? (
      <Alert
        type="error"
        closable={false}
        message="Editing article loading error. Please update."
      />
    ) : null;
  const noDataMessage =
    !isLoading && viewingArticle === null ? (
      <Alert
        type="info"
        closable={false}
        message="There is no data. Please update."
      />
    ) : null;
  useEffect(() => {
    dispatch(setSlug(id));
    dispatch(loadArticle({ id }));
  }, []);
  useEffect(() => {
    if (article && article.author.username !== userName) {
      history.push(`/articles/${article.slug}`);
    } else {
      dispatch(setEditStatus(true));
    }
  }, [article]);
  return (
    <>
      {errorMessage}
      {noDataMessage}
      <h1 className={styles['visually-hidden']}>Blog - Editing article</h1>
      <ArticleForm blanc={false} />
    </>
  );
};

export const EditArticlePageWithRouter = withRouter(EditArticlePage);
