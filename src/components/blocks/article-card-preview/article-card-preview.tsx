import React from 'react';

import { ArticleDescription } from '../article-description';
import { ArticleIssueInfo } from '../article-issue-info';

import styles from './article-card-preview.module.scss';

export const ArticleCardPreview = ({ article }) => {
  const { author, description, favoritesCount, tagList, title, createdAt, slug } = article;
  return (
    <article className={styles['article-card-preview']}>
      <div className={styles['article-card-preview__description']}>
        <ArticleDescription
          articleDescription={description}
          articleFavoritesCount={favoritesCount}
          articleTagList={tagList}
          articleTitle={title}
          articleSlug={slug}
        />
      </div>
      <ArticleIssueInfo
        createdAt={createdAt}
        author={author}
      />
    </article>
  );
};
