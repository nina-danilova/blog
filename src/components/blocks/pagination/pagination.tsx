import React from 'react';
import { Pagination as AntdPagination } from 'antd';
import { useSelector } from 'react-redux';

import { changeCurrentPage } from 'redux/action-creators/articles';
import { RootState } from 'redux/reducers';
import { store } from 'redux/store';

export const Pagination: React.FC = () => {
  const currentPage = useSelector((state: RootState) => state.articles.currentPage);
  const articlesCount = useSelector((state: RootState) => state.articles.articlesCount);
  const onPageChange = (page) => store.dispatch(changeCurrentPage(page));
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
