import React from 'react';
import { Pagination } from 'antd';

function Paginations(props) {
  const {
    total,
    showQuickJumper = total > 50,
    pageConfig,
    showSizeChanger = false,
    change,
  } = props;
  return (
    <div
      style={{
        display: total > 0 ? 'flex' : 'none',
        justifyContent: 'space-between',
        marginTop: 20,
      }}
    >
      <span>
        共 {total} 条记录 第 {pageConfig.page} / {Math.ceil(total / pageConfig.page_size)} 页
      </span>
      <Pagination
        showQuickJumper={showQuickJumper}
        showSizeChanger={showSizeChanger}
        total={total}
        current={pageConfig.page}
        onChange={(page, pageSize) => {
          change(page, pageSize);
        }}
      />
    </div>
  );
}
export default Paginations;
