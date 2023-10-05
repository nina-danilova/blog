import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { clsx } from 'clsx';
import { Button, message, Popconfirm } from 'antd';

import { linkPaths } from 'utilities/constants';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { deleteArticle } from 'redux-toolkit/article/articleThunks';

import styles from './article-actions.module.scss';

const onCancelDelete = () => {
  message.error('Deleting article cancelled');
};

export const ArticleActions: React.FC = () => {
  const { pathToArticles } = linkPaths;
  const history = useHistory();
  const dispatch = useAppDispatch();
  const slug = useAppSelector((state) => state.viewingArticle.slug);
  const onConfirmDelete = async () => {
    if (slug) {
      const result = await dispatch(deleteArticle(slug));
      if (!result.payload) {
        history.push(pathToArticles);
      }
    }
  };
  return (
    <ul className={styles['article-actions-list']}>
      <li className={styles['article-actions-item']}>
        <Popconfirm
          placement="rightTop"
          title="Are you sure to delete this article?"
          onConfirm={onConfirmDelete}
          onCancel={onCancelDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button
            danger
            className={clsx(styles['article-actions-button'])}
          >
            Delete
          </Button>
        </Popconfirm>
      </li>
      <li className={styles['article-actions-item']}>
        <Link
          to={`${pathToArticles}${slug}/edit`}
          className={styles['article-actions-link']}
        >
          Edit
        </Link>
      </li>
    </ul>
  );
};
