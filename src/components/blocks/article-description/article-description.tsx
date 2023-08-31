import React from 'react';
import { withRouter, useHistory } from 'react-router-dom';

import { goToPage } from 'utilities/history';

import styles from './article-description.module.scss';

type ArticleDescriptionProps = {
  title: string;
  favoritesCount: number;
  tagList: string[];
  description: string;
  slug: string;
};

const ArticleDescription: React.FC<ArticleDescriptionProps> = ({
  title,
  favoritesCount,
  tagList,
  description,
  slug,
}) => {
  const pathToArticle = `/articles/${slug}`;
  const tags = [...tagList];
  const styledTags = tags.map((tag) => (
    <span
      key={tag}
      className={styles['article-tag-item']}
    >
      {tag}
    </span>
  ));
  const history = useHistory();
  const onTitleClick = () => {
    goToPage(pathToArticle, history);
  };
  const onTitleKeyDown = () => {
    goToPage(pathToArticle, history);
  };
  return (
    <div className={styles['article-description']}>
      <div className={styles['article-description-header']}>
        <p className={styles['article-title']}>
          <p
            className={styles['article-title']}
            role="button"
            onClick={onTitleClick}
            onKeyDown={onTitleKeyDown}
          >
            {title}
          </p>
        </p>
        <button
          className={styles['article-like-button']}
          type="button"
        >
          <span className={styles['article-like-button-name']}>{favoritesCount}</span>
        </button>
      </div>
      <p className={styles['article-tag-list']}>{styledTags}</p>
      <p className={styles['article-tag-lead']}>{description}</p>
    </div>
  );
};

export const ArticleDescriptionWithRouter = withRouter(ArticleDescription);
