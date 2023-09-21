import React from 'react';
import { withRouter, useHistory } from 'react-router-dom';

import { goToPage } from 'utilities/history';

import styles from './article-description.module.scss';

const addIdToTags = (list: string[]): { name: string; id: number }[] => {
  let id = 0;
  return list.map((tag) => {
    const tagWithId = { name: tag, id };
    id += 1;
    return tagWithId;
  });
};

type ArticleDescriptionProps = {
  title: string;
  favoritesCount: number;
  tagList: string[];
  description: string;
  slug: string;
};

const ArticleDescription: React.FC<ArticleDescriptionProps> = ({
  title,
  favoritesCount,
  tagList,
  description,
  slug,
}) => {
  const pathToArticle = `/articles/${slug}`;
  const preparedTags = addIdToTags([...tagList]);
  const styledTags = preparedTags.map((tag) => (
    <span
      key={`${tag.id}-${tag.name}`}
      className={styles['article-tag-item']}
    >
      {tag.name}
    </span>
  ));
  const history = useHistory();
  const onTitleClick = () => {
    goToPage(pathToArticle, history);
  };
  const onTitleKeyDown = () => {
    goToPage(pathToArticle, history);
  };
  return (
    <div className={styles['article-description']}>
      <div className={styles['article-description-header']}>
        <p
          className={styles['article-title']}
          role="button"
          onClick={onTitleClick}
          onKeyDown={onTitleKeyDown}
        >
          {title}
        </p>
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
  );
};

export const ArticleDescriptionWithRouter = withRouter(ArticleDescription);
