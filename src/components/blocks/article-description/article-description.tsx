import React from 'react';
import { withRouter } from 'react-router-dom';

import { goToPage } from './utility';
import styles from './article-description.module.scss';

const ArticleDescription = ({ title, favoritesCount, tagList, description, slug, history }) => {
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
