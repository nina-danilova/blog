import React from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { clsx } from 'clsx';

import { addIdToTags } from 'utilities/tags';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { favoriteArticle, unfavoriteArticle } from 'redux-toolkit/article/articleThunks';
import { setLikeToArticle } from 'redux-toolkit/articles/articlesSlice';
import { Article, setLikeToViewingArticle } from 'redux-toolkit/article/articleSlice';

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
  const isAuthorized = useAppSelector((state) => state.user.isAuthorized);
  const articleList = useAppSelector((state) => state.articles.articleList);
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
  const likeArticle = async () => {
    const result = (await dispatch(favoriteArticle(slug))) as { payload: Article; type: string };
    if (!result || !result.payload) {
      return;
    }
    if (!result.type.endsWith('fulfilled')) {
      return;
    }
    if (articleList.length) {
      const index = articleList.findIndex((article) => article.slug === slug);
      dispatch(setLikeToArticle({ isLiked: true, index, counter: 1 }));
    }
    if (viewingArticleSlug && viewingArticleSlug === slug) {
      dispatch(setLikeToViewingArticle(result.payload));
    }
  };
  const dislikeArticle = async () => {
    const result = (await dispatch(unfavoriteArticle(slug))) as { payload: Article; type: string };
    if (!result || !result.payload) {
      return;
    }
    if (!result.type.endsWith('fulfilled')) {
      return;
    }
    if (articleList.length) {
      const index = articleList.findIndex((article) => article.slug === slug);
      dispatch(setLikeToArticle({ isLiked: false, index, counter: -1 }));
    }
    if (viewingArticleSlug && viewingArticleSlug === slug) {
      dispatch(setLikeToViewingArticle(result.payload));
    }
  };
  const history = useHistory();
  const onTitleClick = () => {
    history.push(pathToArticle);
  };
  const onTitleKeyDown = () => {
    history.push(pathToArticle);
  };
  const onLikeButtonClick = async () => {
    return favorited ? dislikeArticle() : likeArticle();
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
          disabled={!isAuthorized}
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
