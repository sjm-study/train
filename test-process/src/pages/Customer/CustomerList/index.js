import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Form, Select, Space, Input, DatePicker, Button, Table } from 'antd';
import numeral from 'numeral';
import Pagination from '@/components/Pagination';
import style from '@/global.less';

const { Option } = Select;
const { RangePicker } = DatePicker;

function Index() {
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <a>{record.name}</a>,
    },
    {
      title: '地区',
      dataIndex: 'area',
      key: 'area',
    },
    {
      title: '订阅状态',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      render: (text, record) => {
        if (record.orderStatus) {
          return (
            <span
              style={{
                padding: 8,
                borderRadius: 13,
                paddingLeft: 15,
                paddingRight: 15,
                color: 'rgb(23, 144, 255)',
                border: '1px solid rgb(23, 144, 255)',
              }}
            >
              已订阅
            </span>
          );
        }
        return (
          <span
            style={{
              padding: 8,
              borderRadius: 13,
              paddingLeft: 15,
              paddingRight: 15,
              color: 'rgb(232, 153, 174)',
              border: '1px solid rgb(231, 139, 53)',
            }}
          >
            未订阅
          </span>
        );
      },
    },
    {
      title: '订单数',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
    },
    {
      title: '订单总金额',
      dataIndex: 'orderTotal',
      key: 'orderTotal',
      render: (text, record) => <span>￥{numeral(record.orderTotal).format('0,0.00')}</span>,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: () => <Button type="link">查看</Button>,
    },
  ];
  const dataSource = [
    {
      id: '1',
      name: '525252522',
      area: '福建',
      orderStatus: true,
      orderTotal: 25.22,
      orderNumber: 5,
    },
    {
      id: '2',
      name: '525252522',
      area: '福建',
      orderStatus: false,
      orderTotal: 25.22,
      orderNumber: 5,
    },
  ];

  const clickRow = () => {
    
  };

  return (
    <PageContainer>
      <Form>
        <Space size="large">
          <Form.Item initialValue="all" name="orderStatus">
            <Select onChange={() => {}} style={{ width: 180 }}>
              <Option value="all">全部订阅状态</Option>
              <Option value="doing">进行中</Option>
              <Option value="complete">已完成</Option>
              <Option value="cancel">已取消</Option>
            </Select>
          </Form.Item>
          <Form.Item initialValue="all" name="deliveryStatus">
            <Select onChange={() => {}} style={{ width: 180 }}>
              <Option value="all">全部地区</Option>
              <Option value="delivery">已发货</Option>
              <Option value="undelivery">未发货</Option>
            </Select>
          </Form.Item>

          <Form.Item initialValue="" name="time">
            <RangePicker />
          </Form.Item>

          <Form.Item name="value">
            <Input placeholder="请输入姓名/邮箱/手机 " style={{ width: 400 }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" style={{ marginRight: 10 }}>
              查询
            </Button>
            <Button type="default">重置</Button>
          </Form.Item>
        </Space>
      </Form>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        rowKey={(record) => record.id}
        className={style.tableRow}
        onRow={(record) => {
          return {
            onClick: () => clickRow(record),
          };
        }}
      />
      <Pagination total={50} pageConfig={{ limit: 10, page: 1 }} />
    </PageContainer>
  );
}

export default Index;
