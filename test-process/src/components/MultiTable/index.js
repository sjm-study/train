import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons';
import Pagination from '@/components/Pagination';
import style from '@/global.less';

function MultiTable(props) {
  const {
    columns,
    orderList = {},
    loading = false,
    Paginationchange,
    pageConfig,
    tableHeaderColums = []
  } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [left, setLeft] = useState(false);

  useEffect(() => {
    if (selectedRowKeys.length > 0) {
      setLeft(true)
    } else {
      setLeft(false)
    }
  }, [selectedRowKeys])

  return (
    <div>
      {
        tableHeaderColums.length > 0 &&
        <div
          style={{
            position: 'absolute',
            backgroundColor: left ? 'rgb(250,250,250)' : '',
            zIndex: 2,
            height: 54,
            left: 30,
            display: 'flex',
            alignItems: 'center',
            width: 'calc(100% - 30px)',
          }}
        >
          <a onClick={() => setLeft((pre) => !pre)} style={{color:'#888'}} >
            {left ? <CaretLeftOutlined /> : <CaretRightOutlined />}
          </a>
          <div style={{ display: left ? 'block' : 'none' }} >
            {
              tableHeaderColums.map((item,index)=> (
                 <Button key={`header${index}`} onClick={()=>item.click(selectedRowKeys)} 
                  type='link' disabled={selectedRowKeys.length<=0}
                 >{item.name}</Button>
              ))
            }
          </div>
        </div>
      }

      <Table
        columns={columns}
        dataSource={orderList.data}
        rowKey={'ID'}
        className={style.tableRow}
        loading={loading}
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys,
          onChange: (RowKeys) => {
            setSelectedRowKeys(RowKeys);
          },
        }}
        pagination={false}
      // onRow={record => {
      //   return {
      //     // onClick: () => history.push(`/order/detail/${record.ID}`)
      //   }
      // }}
      />
      <Pagination
        total={orderList.meta.total}
        change={(page, pageSize) => Paginationchange(page, pageSize)}
        pageConfig={pageConfig}
        showSizeChanger
      />
    </div>
  );
}

export default MultiTable;
