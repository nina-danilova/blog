import React from 'react';

import styles from './article-issue-info.module.scss';
import { getDate } from './utility';

type ArticleIssueInfoProps = {
  createdAt: string;
  author: {
    image: string;
    username: string;
  };
};

export const ArticleIssueInfo: React.FC<ArticleIssueInfoProps> = ({ createdAt, author }) => {
  const { image, username } = author;
  const authorUrl = image || 'img/icon-author-avatar.svg';
  const issueDate = getDate(createdAt);
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
