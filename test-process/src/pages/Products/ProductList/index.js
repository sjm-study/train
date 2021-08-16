import React, { useState, useEffect } from 'react';
import { Select, Input, Space, Form, Button, Table, Tag } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import Pagination from '@/components/Pagination';
import { history, connect } from 'umi';

const { Option } = Select;

function Index(props) {
  const { dispatch, products, loading } = props;

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pageConfig, setPageConfig] = useState({ page_size: 10, page: 1 });

  const columns = [
    {
      title: '商品',
      dataIndex: 'post_title',
      key: 'post_title',
      render: (text, record) => (
        <div>
          <img src={record.image} alt="img" style={{ width: 50 }} />
          <span style={{ marginLeft: 10 }}>{record.post_title}</span>
        </div>
      ),
    },
    {
      title: '分类',
      dataIndex: 'type',
      key: 'type',
      render: (text, record) => {
        let data;
        if (record.categories.length < 3) {
          data = record.categories.map((item, CAIndex) => {
            // eslint-disable-next-line react/no-array-index-key
            return <Tag key={CAIndex}>{item.seo_title}</Tag>;
          });
        } else {
          data = (
            <div>
              <Tag>{record.categories[0].seo_title}</Tag>
              <Tag>{record.categories[1].seo_title}</Tag>
              <Tag>{record.categories[2].seo_title}</Tag>......
            </div>
          );
        }
        return data;
      },
    },
    {
      title: '状态',
      dataIndex: 'OffShelf',
      key: 'OffShelf',
      render: (text, record) => {
        if (record.post_status === 'private') {
          return (
            <span
              style={{
                color: 'rgb(210, 18, 130)',
                backgroundColor: 'rgb(247, 228, 231)',
                border: '1px solid rgb(247, 18, 21)',
                borderRadius: 10,
                padding: 8,
              }}
            >
              已下架
            </span>
          );
        }
        return (
          <span
            style={{
              color: 'rgb(28, 108, 26)',
              backgroundColor: 'rgb(229, 248, 231)',
              border: '1px solid rgb(157, 186, 46)',
              borderRadius: 10,
              padding: 8,
            }}
          >
            上架中
          </span>
        );
      },
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
      type: '衣服',
      img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3419276493,3061530094&fm=26&gp=0.jpg',
      OffShelf: true,
    },
    {
      id: 2,
      name: '夏季热卖衣服',
      type: '衣服',
      img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3419276493,3061530094&fm=26&gp=0.jpg',
      OffShelf: false,
    },
  ];

  useEffect(() => {
    dispatch({
      type: 'products/fetchProductsList',
      payload: { sort: '-ID', page: 1, page_size: 10 },
    });
  }, [dispatch]);

  return (
    <PageContainer>
      <div
        style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 17, marginRight: 2 }}
      >
        <Button
          type="primary"
          onClick={() => {
            history.push('/products/productList/addProduct');
          }}
        >
          添加商品
        </Button>
      </div>
      <Form>
        <Space size="large">
          <Form.Item initialValue="all" name="orderStatus">
            <Select onChange={() => {}} style={{ width: 180 }}>
              <Option value="all">全部分类</Option>
              <Option value="doing">衣服</Option>
              <Option value="complete">裤子</Option>
              <Option value="cancel">鞋子</Option>
            </Select>
          </Form.Item>
          <Form.Item initialValue="all" name="deliveryStatus">
            <Select onChange={() => {}} style={{ width: 180 }}>
              <Option value="all">全部标签</Option>
              <Option value="delivery">已发货</Option>
              <Option value="undelivery">未发货</Option>
            </Select>
          </Form.Item>
          <Form.Item initialValue="all" name="time">
            <Select onChange={() => {}} style={{ width: 180 }}>
              <Option value="all">全部状态</Option>
              <Option value="doing">已上架</Option>
              <Option value="complete">已下架</Option>
            </Select>
          </Form.Item>

          <Form.Item name="value">
            <Input placeholder="请输入商品名或SKU " style={{ width: 400 }} />
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
          dataSource={products.list}
          rowKey={(record) => record.ID}
          pagination={false}
          loading={loading}
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
                key: 'shelf',
                text: '上架',
                onSelect: (changableRowKeys) => {
                  const newSelectedRowKeys = changableRowKeys.filter((key) => {
                    if (dataSource[key - 1].OffShelf) {
                      return false;
                    }
                    return true;
                  });
                  setSelectedRowKeys(newSelectedRowKeys);
                },
              },
              {
                key: 'OffShelf',
                text: '下架',
                onSelect: (changableRowKeys) => {
                  const newSelectedRowKeys = changableRowKeys.filter((key) => {
                    if (dataSource[key - 1].OffShelf) {
                      return true;
                    }
                    return false;
                  });
                  setSelectedRowKeys(newSelectedRowKeys);
                },
              },
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
        total={products.total}
        change={(page, pageSize) => setPageConfig({ limit: pageSize, page })}
        pageConfig={pageConfig}
      />
    </PageContainer>
  );
}

export default connect(({ products, loading }) => ({
  loading: loading.effects['products/fetchProductsList'],
  products,
}))(Index);
