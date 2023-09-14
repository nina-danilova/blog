import React from 'react';
import { Pagination as AntdPagination } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { changeCurrentPage } from 'redux-toolkit/articles/articlesSlice';
import { RootState } from 'redux-toolkit/index';

export const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state: RootState) => state.articles.currentPage);
  const articlesCount = useSelector((state: RootState) => state.articles.articlesCount);
  const onPageChange = (page) => dispatch(changeCurrentPage(page));
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
