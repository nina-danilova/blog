import React from 'react';

import './article-card.module.scss';

export const ArticleCard = () => {
  return (
    <article className="article-card">
      <div className="article-card__issue-info article-issue-info">Photo</div>
      <div className="article-card__description">
        <p className="article-card__title article-title">Some article title</p>
        <div className="article-card__like-count article-like-count">12</div>
      </div>
    </article>
  );
};
