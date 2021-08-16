import React, { useState } from 'react';
import { Input, Space, Form, Button, Table } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import Pagination from '@/components/Pagination';
import { history } from 'umi';

function Index() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 1 });

  const columns = [
    {
      title: '分类',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <img src={record.img} alt="img" style={{ width: 50 }} />
          <span>{record.name}</span>
        </div>
      ),
    },
    {
      title: '商品数量',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: () => <Button type="link">编辑</Button>,
    },
  ];
  const dataSource = [
    {
      id: 1,
      name: '夏季热卖衣服',
      number: '888',
      img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3419276493,3061530094&fm=26&gp=0.jpg',
      OffShelf: true,
    },
    {
      id: 2,
      name: '夏季热卖衣服',
      number: '88',
      img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3419276493,3061530094&fm=26&gp=0.jpg',
      OffShelf: false,
    },
  ];

  return (
    <PageContainer>
      <div
        style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 17, marginRight: 2 }}
      >
        <Button
          type="primary"
          onClick={() => {
            history.push('/products/classificationList/addClassification');
          }}
        >
          添加分类
        </Button>
      </div>
      <Form>
        <Space size="large">
          <Form.Item name="value">
            <Input placeholder="请输入分类名称" style={{ width: 400 }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" style={{ marginRight: 10 }}>
              查询
            </Button>
            <Button type="default">重置</Button>
          </Form.Item>
        </Space>
      </Form>
      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey={(record) => record.id}
          pagination={false}
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys,
            onChange: (RowKeys) => {
              setSelectedRowKeys(RowKeys);
            },
            selections: [
              Table.SELECTION_ALL,
              Table.SELECTION_INVERT,
              Table.SELECTION_NONE,
              {
                key: 'delete',
                text: '删除',
                // onSelect: changableRowKeys => {
                //   // const newSelectedRowKeys = changableRowKeys.filter((key) => {
                //   //   if (dataSource[key - 1].orderStatus === 'doing') {
                //   //     return true
                //   //   } return false
                //   // })
                //   // setSelectedRowKeys(newSelectedRowKeys)
                // }
              },
            ],
          }}
          onRow={() => {
            return {
              onClick: () => {},
            };
          }}
        />
      </div>
      <Pagination
        total={55}
        change={(page, pageSize) => setPageConfig({ limit: pageSize, page })}
        pageConfig={pageConfig}
      />
    </PageContainer>
  );
}

export default Index;
