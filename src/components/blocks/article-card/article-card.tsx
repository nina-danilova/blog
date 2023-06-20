import React from 'react';

import styles from './article-card.module.scss';

export const ArticleCard = () => {
  return (
    <article className={styles['article-card']}>
      <div className={styles['article-description']}>
        <div className={styles['article-description-header']}>
          <p className={styles['article-title']}>Some article title</p>
          <button
            className={styles['article-like-button']}
            type="button"
          >
            12
          </button>
        </div>
        <p className={styles['article-tag-list']}>
          <span className={styles['article-tag-item']}>Tag1</span>
        </p>
        <p className={styles['article-tag-lead']}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </p>
      </div>
      <div className={styles['article-issue-info']}>
        <img
          className={styles['article-author-photo']}
          src="img/icon-author-avatar.svg"
          width="50"
          height="50"
          alt="Article author"
        />
        <div className={styles['article-author-info']}>
          <p className={styles['article-author-name']}>John Doe</p>
          <p className={styles['article-issue-date']}>March 5, 2020</p>
        </div>
      </div>
    </article>
  );
};
