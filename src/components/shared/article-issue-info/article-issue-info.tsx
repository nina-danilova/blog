import React from 'react';

import imageUrl from 'assets/icons/icon-author-avatar.svg';
import { getDate } from 'utilities/dates';

import styles from './article-issue-info.module.scss';

type ArticleIssueInfoProps = {
  createdAt: string;
  author: {
    image: string;
    username: string;
  };
};

export const ArticleIssueInfo: React.FC<ArticleIssueInfoProps> = ({ createdAt, author }) => {
  const { image, username } = author;
  const authorUrl = image || imageUrl;
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
