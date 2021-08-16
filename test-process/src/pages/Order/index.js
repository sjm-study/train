/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Select, DatePicker, Input, Space, Form, Button } from 'antd';
import { CaretUpOutlined, CaretDownOutlined, LineOutlined } from '@ant-design/icons';
import { connect, useRequest } from 'umi';
import MultiTable from '@/components/MultiTable';
import { batchShip } from '@/services/order';
import moment from 'moment';
import numeral from 'numeral';
import { SketchPicker } from 'react-color'
// import style from '@/global.less'

const { RangePicker } = DatePicker;
const { Option } = Select;

function Order(props) {
  const { orderList, loading, dispatch } = props;

  const [active, setActive] = useState(false);
  const [pageConfig, setPageConfig] = useState({ page_size: 10, page: 1 });
  const [form] = Form.useForm();

  const columns = [
    {
      title: '订单编号',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: '付款时间',
      dataIndex: 'paid_date',
      key: 'paid_date',
      render: (text, record) => (
        <span>{moment(record.paymentTime).format('YYYY-MM-DD HH:MM:SS')}</span>
      ),
    },
    {
      title: '订单状态',
      dataIndex: 'post_status',
      key: 'post_status',
      render: (text, record) => {
        if (record.post_status === 'wc-processing' || record.post_status === 'wc-pending') {
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 10000,
                  backgroundColor: 'rgb(14, 119, 209)',
                }}
              ></span>
              <span style={{ marginLeft: 5 }}>进行中</span>
            </div>
          );
        }
        if (record.post_status === 'wc-cancelled') {
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 10000,
                  backgroundColor: 'rgb(240, 65, 52)',
                }}
              ></span>
              <span style={{ marginLeft: 5 }}>已取消</span>
            </div>
          );
        }
        if (record.post_status === 'wc-completed') {
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 10000,
                  backgroundColor: 'rgb(0, 168, 84)',
                }}
              ></span>
              <span style={{ fontWeight: '600', marginLeft: 5 }}>已完成</span>
            </div>
          );
        }
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 10000,
                backgroundColor: 'rgb(0, 168, 84)',
              }}
            ></span>
            <span style={{ fontWeight: '600', marginLeft: 5 }}>已退单</span>
          </div>
        );
      },
    },
    {
      title: '发货状态',
      dataIndex: 'fulfillment_status',
      key: 'fulfillment_status',
      render: (text, record) => {
        if (record.fulfillment_status === 'fulfilled') {
          return (
            <span
              style={{
                padding: 8,
                borderRadius: 13,
                paddingLeft: 15,
                paddingRight: 15,
                color: 'rgb(121,121,121)',
                border: '1px solid rgb(121,121,121)',
              }}
            >
              已发货
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
              color: '#eb1700',
              border: '1px solid #eb1700',
            }}
          >
            未发货
          </span>
        );
      },
    },
    {
      title: '订单金额',
      dataIndex: 'order_total',
      key: 'order_total',
      render: (text, record) => <span>￥{numeral(record.order_total).format('0,0.00')}</span>,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: () => <Button type="link">查看</Button>,
    },
  ];

  const { run: runBatchShip } = useRequest(batchShip, {
    manual: true
  })


  const tableHeaderColums = [
    {
      name: '发货',
      click: (keys) => { runBatchShip({ order_shipping: keys }) }
    },
    {
      name: '标记已完成',
      click: () => { }
    },
    {
      name: '标记进行中',
      click: () => { }
    },
  ]

  const getData = (query) => {
    dispatch({
      type: 'orderData/fetchListData',
      payload: query,
    });
  };

  useEffect(() => {
    getData(pageConfig);
    const lister = () => {  }
    window.addEventListener('resize', lister)
    return () => window.removeEventListener('resize', lister)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitFormData = (values) => {
    let option = { ...values };
    if (values.date) {
      const { date } = values;
      option = {
        ...values,
        date: [date[0].format('YYYY-MM-DD'), date[0].format('YYYY-MM-DD')],
      };
    }
    if (!option.date) {
      delete option.date;
    }
    if (option.status === 'all') {
      delete option.status;
    }
    if (option.fulfillment_status === 'all') {
      delete option.fulfillment_status;
    }
    if (option.search.length === 0) {
      delete option.search;
    }
    const filter = {};
    // eslint-disable-next-line guard-for-in
    for (const key in option) {
      filter[`filter[${key}]`] = option[key];
    }
    const results = { ...{ page_size: 10, page: 1 }, ...filter };
    setPageConfig({ page_size: 10, page: 1 })
    getData(results);
  };

  const changeList = (page, pageSize) => {
    const { getFieldsValue } = form;
    const values = getFieldsValue();
    let option = { ...values };
    if (values.date) {
      const { date } = values;
      option = {
        ...values,
        date: [date[0].format('YYYY-MM-DD'), date[0].format('YYYY-MM-DD')],
      };
    }
    if (!option.date) {
      delete option.date;
    }
    if (option.status === 'all') {
      delete option.status;
    }
    if (option.fulfillment_status === 'all') {
      delete option.fulfillment_status;
    }
    if (option.search.length === 0) {
      delete option.search;
    }
    const filter = {};
    // eslint-disable-next-line guard-for-in
    for (const key in option) {
      filter[`filter[${key}]`] = option[key];
    }
    const results = { ...filter, ...{ page, page_size: pageSize } };
    getData(results);
    setPageConfig({ page_size: pageSize, page });
  };

  const handleColorChange = colorCode => {
    const { rgb } = colorCode;
    const { r, g, b, a } = rgb;
    const rgba = `rgba(${r},${g},${b},${a})`;
    const { getChild, type, onChange } = this.props;
    onChange(rgba);
    getChild(rgba, type);
  };

  return (
    <PageContainer>
      <Form
        onFinish={(values) => submitFormData(values)}
        form={form}
        initialValues={{
          data: '',
          fulfillment_status: 'all',
          search: '',
          status: 'all',
        }}
        id={'form-pop'}
      >
        <Space size="large">
          <Form.Item name="status">
            <Select onChange={() => { }} style={{ width: 180 }}>
              <Option value="all">全部订单状态</Option>
              <Option value="wc-pending wc-processing">进行中</Option>
              <Option value="wc-completed">已完成</Option>
              <Option value="wc-cancel">已取消</Option>
            </Select>
          </Form.Item>
          <Form.Item name="fulfillment_status">
            <Select onChange={() => { }} style={{ width: 180 }}>
              <Option value="all">全部发货状态</Option>
              <Option value="fulfilled">已发货</Option>
              <Option value="unfulfilled">未发货</Option>
            </Select>
          </Form.Item>

          <Form.Item name="date">
            <RangePicker />
          </Form.Item>

          <Form.Item name="search">
            <Input placeholder="请输入订单编号/支付编号/商品名/SKU/邮箱 " style={{ width: 400 }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" style={{ marginRight: 10 }} htmlType="submit">
              查询
            </Button>
            <Button type="default" htmlType="reset">
              重置
            </Button>
          </Form.Item>
        </Space>
        <div style={{ display: active ? 'flex' : 'none' }} >
          <div style={{ display: 'flex', alignItems: 'center' }} >
            <Form.Item name="minPrice">
              <Input placeholder="最小金额" />
            </Form.Item>
            <LineOutlined style={{ paddingBottom: 25 }} />
            <Form.Item name="maxPrice">
              <Input placeholder="最大金额" />
            </Form.Item>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }} >
            <Form.Item name="minOrder" style={{ marginLeft: 10 }}>
              <Input placeholder="最小订单" />
            </Form.Item>
            <LineOutlined style={{ paddingBottom: 25 }} />
            <Form.Item name="maxOrder">
              <Input placeholder="最大订单" />
            </Form.Item>
          </div>
        </div>
        <Button
          type="link"
          style={{ display: !active ? 'block' : 'none', margin: '0 auto' }}
          onClick={() => setActive(true)}
        >
          更多筛选
          <CaretDownOutlined />
        </Button>
        <Button
          type="link"
          style={{ display: active ? 'block' : 'none', margin: '0 auto' }}
          onClick={() => setActive(false)}
        >
          收起更多
          <CaretUpOutlined />
        </Button>
      </Form>
      <MultiTable
        columns={columns}
        loading={loading}
        orderList={orderList}
        pageConfig={pageConfig}
        Paginationchange={(page, pageSize) => changeList(page, pageSize)}
        tableHeaderColums={tableHeaderColums}
      />
      <SketchPicker color={'#eb1700'} onChange={handleColorChange} />
    </PageContainer>
  );
}

export default connect(({ orderData, loading }) => ({
  orderList: orderData.list,
  loading: loading.effects['orderData/fetchListData'],
}))(Order);
