import React from 'react';
import ReactMarkdown from 'react-markdown';

import { ArticleDescriptionWithRouter } from 'components/shared/article-description';
import { ArticleIssueInfo } from 'components/shared/article-issue-info';
import { useAppSelector } from 'hooks/hooks';

import styles from './article-card-full-view.module.scss';
import { ArticleActions } from './article-actions';

export const ArticleCardFullView: React.FC = () => {
  const article = useAppSelector((state) => state.viewingArticle.article);
  const isAuthorized = useAppSelector((state) => state.user.authorized);
  const userName = useAppSelector((state) => state.profile.userName);
  if (!article) return null;
  const { author, description, favoritesCount, tagList, title, createdAt, body, slug } = article;
  const actionGroup = isAuthorized && article.author.username === userName ? <ArticleActions /> : null;
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
      {actionGroup}
      <div className={styles['article-card-full-view__body']}>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </article>
  );
};
