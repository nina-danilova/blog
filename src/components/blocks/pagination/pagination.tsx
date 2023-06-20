import React from 'react';
import { Pagination as AntdPagination } from 'antd';

import '../../app/variables.module.scss';

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
