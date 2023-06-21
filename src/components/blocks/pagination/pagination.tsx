import React from 'react';
import { Pagination as AntdPagination } from 'antd';
import { useSelector } from 'react-redux';

import '../../app/variables.module.scss';
import { changeCurrentPage } from '../../../redux/action-creators/articles';
import { RootState } from '../../../redux/reducers';
import { store } from '../../../redux/store';

export const Pagination = () => {
  const currentPage = useSelector((state: RootState) => state.articles.currentPage);
  const articlesCount = useSelector((state: RootState) => state.articles.articlesCount);
  return (
    <AntdPagination
      current={currentPage}
      defaultPageSize={20}
      showSizeChanger={false}
      total={articlesCount}
      onChange={(page) => store.dispatch(changeCurrentPage(page))}
    />
  );
};
