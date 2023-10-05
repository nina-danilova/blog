import React from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { clsx } from 'clsx';

import { addIdToTags } from 'utilities/tags';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { favoriteArticle, loadArticle, unfavoriteArticle } from 'redux-toolkit/article/articleThunks';
import { loadArticles } from 'redux-toolkit/articles/articlesThunks';

import styles from './article-description.module.scss';

type ArticleDescriptionProps = {
  title: string;
  favoritesCount: number;
  tagList: string[];
  description: string;
  slug: string;
  favorited: boolean;
};

const ArticleDescription: React.FC<ArticleDescriptionProps> = ({
  title,
  favoritesCount,
  tagList,
  description,
  slug,
  favorited,
}) => {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector((state) => state.user.authorized);
  const currentPage = useAppSelector((state) => state.articles.currentPage);
  const viewingArticleSlug = useAppSelector((state) => state.viewingArticle.slug);
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
    history.push(pathToArticle);
  };
  const onTitleKeyDown = () => {
    history.push(pathToArticle);
  };
  const isDisabled = !isAuthorized;
  const onLikeButtonClick = async () => {
    if (!favorited) {
      const result = await dispatch(favoriteArticle(slug));
      if (result.type.endsWith('fulfilled')) {
        await dispatch(loadArticles({ currentPage }));
        if (viewingArticleSlug === slug) {
          await dispatch(loadArticle({ id: slug }));
        }
      }
    } else {
      const result = await dispatch(unfavoriteArticle(slug));
      if (result.type.endsWith('fulfilled')) {
        await dispatch(loadArticles({ currentPage }));
        if (viewingArticleSlug === slug) {
          await dispatch(loadArticle({ id: slug }));
        }
      }
    }
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
          onClick={onLikeButtonClick}
          disabled={isDisabled}
        >
          <span
            className={clsx(styles['article-like-button-name'], {
              [styles['article-like-button-name--favorited']]: favorited,
            })}
          >
            {favoritesCount}
          </span>
        </button>
      </div>
      <p className={styles['article-tag-list']}>{styledTags}</p>
      <p className={styles['article-tag-lead']}>{description}</p>
    </div>
  );
};

export const ArticleDescriptionWithRouter = withRouter(ArticleDescription);
