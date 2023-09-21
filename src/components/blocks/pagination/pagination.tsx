import React from 'react';
import { Pagination as AntdPagination } from 'antd';

import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { changeCurrentPage } from 'redux-toolkit/articles/articlesSlice';

export const Pagination: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.articles.currentPage);
  const articlesCount = useAppSelector((state) => state.articles.articlesCount);
  const onPageChange = (page: number) => dispatch(changeCurrentPage(page));
  return (
    <AntdPagination
      current={currentPage}
      defaultPageSize={20}
      showSizeChanger={false}
      total={articlesCount}
      onChange={onPageChange}
    />
  );
};
