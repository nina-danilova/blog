import React from 'react';
import { Pagination as AntdPagination } from 'antd';

export const Pagination = () => {
  return (
    <AntdPagination
      current={1}
      defaultPageSize={20}
      showSizeChanger={false}
      total={100}
      onChange={() => console.log('pagination changed')}
    />
  );
};
