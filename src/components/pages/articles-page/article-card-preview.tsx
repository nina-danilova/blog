import React from 'react';

import { ArticleDescriptionWithRouter } from 'components/shared/article-description';
import { ArticleIssueInfo } from 'components/shared/article-issue-info';

import styles from './article-card-preview.module.scss';

type ArticleCardPreviewProps = {
  article: {
    author: {
      image: string;
      username: string;
    };
    description: string;
    favoritesCount: number;
    favorited: boolean;
    tagList: string[];
    title: string;
    createdAt: string;
    slug: string;
  };
};

export const ArticleCardPreview: React.FC<ArticleCardPreviewProps> = ({ article }) => {
  const { author, description, favoritesCount, favorited, tagList, title, createdAt, slug } = article;
  return (
    <article className={styles['article-card-preview']}>
      <div className={styles['article-card-preview__description']}>
        <ArticleDescriptionWithRouter
          description={description}
          favoritesCount={favoritesCount}
          tagList={tagList}
          title={title}
          slug={slug}
          favorited={favorited}
        />
      </div>
      <ArticleIssueInfo
        createdAt={createdAt}
        author={author}
      />
    </article>
  );
};
