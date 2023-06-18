import React from 'react';

import { ArticleList } from '../../blocks/article-list';
import { Pagination } from '../../blocks/pagination';

import './articles-page.module.scss';

export const ArticlesPage = () => {
  return (
    <>
      <h1>Blog - Articles</h1>
      <ArticleList />
      <Pagination />
    </>
  );
};
