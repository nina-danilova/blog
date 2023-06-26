import React from 'react';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';

import { ArticleIssueInfo } from '../article-issue-info';
import { RootState } from '../../../redux/reducers';
import { ArticleDescription } from '../article-description';

import styles from './article-card-full-view.module.scss';

export const ArticleCardFullView = () => {
  const article = useSelector((state: RootState) => state.viewingArticle.article);
  if (!article) return null;
  const { author, description, favoritesCount, tagList, title, createdAt, body, slug } = article;
  return (
    <article className={styles['article-card-full-view']}>
      <div className={styles['article-card-full-view__description']}>
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
      <div className={styles['article-card-full-view__body']}>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </article>
  );
};
