import React from 'react';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';

import { ArticleDescriptionWithRouter } from 'components/blocks/article-description';
import { ArticleIssueInfo } from 'components/blocks/article-issue-info';
import { RootState } from 'redux-toolkit/index';

import styles from './article-card-full-view.module.scss';

export const ArticleCardFullView: React.FC = () => {
  const article = useSelector((state: RootState) => state.viewingArticle.article);
  if (!article) return null;
  const { author, description, favoritesCount, tagList, title, createdAt, body, slug } = article;
  return (
    <article className={styles['article-card-full-view']}>
      <div className={styles['article-card-full-view__description']}>
        <ArticleDescriptionWithRouter
          description={description}
          favoritesCount={favoritesCount}
          tagList={tagList}
          title={title}
          slug={slug}
        />
      </div>
      <ArticleIssueInfo
        createdAt={createdAt}
        author={author}
      />
      <div className={styles['article-card-full-view__body']}>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </article>
  );
};
