import React from 'react';
import { format } from 'date-fns';

import styles from './article-card.module.scss';

export const ArticleCard = ({ article }) => {
  const { author, description, favoritesCount, tagList, title, createdAt } = article;
  const authorUrl = author.image ? author.image : 'img/icon-author-avatar.svg';
  const issueDate = format(new Date(createdAt), 'MMMM dd, yyyy');
  const tags = [...tagList];
  const styledTags = tags.map((tag) => (
    <span
      key={tag}
      className={styles['article-tag-item']}
    >
      {tag}
    </span>
  ));
  return (
    <article className={styles['article-card']}>
      <div className={styles['article-description']}>
        <div className={styles['article-description-header']}>
          <p className={styles['article-title']}>{title}</p>
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
      <div className={styles['article-issue-info']}>
        <img
          className={styles['article-author-photo']}
          src={authorUrl}
          width="50"
          height="50"
          alt="Article author"
        />
        <div className={styles['article-author-info']}>
          <p className={styles['article-author-name']}>{author.username}</p>
          <p className={styles['article-issue-date']}>{issueDate}</p>
        </div>
      </div>
    </article>
  );
};
