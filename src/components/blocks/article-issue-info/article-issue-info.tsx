import React from 'react';
import { format } from 'date-fns';

import styles from './article-issue-info.module.scss';

export const ArticleIssueInfo = ({ createdAt, author }) => {
  const { image, username } = author;
  const authorUrl = image || 'img/icon-author-avatar.svg';
  const issueDate = format(new Date(createdAt), 'MMMM dd, yyyy');
  return (
    <div className={styles['article-issue-info']}>
      <img
        className={styles['article-author-photo']}
        src={authorUrl}
        width="50"
        height="50"
        alt="Article author"
      />
      <div className={styles['article-author-info']}>
        <p className={styles['article-author-name']}>{username}</p>
        <p className={styles['article-issue-date']}>{issueDate}</p>
      </div>
    </div>
  );
};
