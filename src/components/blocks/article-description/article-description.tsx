import React from 'react';

import styles from './article-description.module.scss';

export const ArticleDescription = ({ articleTitle, articleFavoritesCount, articleTagList, articleDescription }) => {
  const tags = [...articleTagList];
  const styledTags = tags.map((tag) => (
    <span
      key={tag}
      className={styles['article-tag-item']}
    >
      {tag}
    </span>
  ));
  return (
    <div className={styles['article-description']}>
      <div className={styles['article-description-header']}>
        <p className={styles['article-title']}>{articleTitle}</p>
        <button
          className={styles['article-like-button']}
          type="button"
        >
          <span className={styles['article-like-button-name']}>{articleFavoritesCount}</span>
        </button>
      </div>
      <p className={styles['article-tag-list']}>{styledTags}</p>
      <p className={styles['article-tag-lead']}>{articleDescription}</p>
    </div>
  );
};
