import React, { useState, useEffect } from 'react';
import { useParams, connect } from 'umi';
import { Button, Row, Col, Table, Card, Modal, Form, Input, Checkbox } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

import styles from './index.less';

function Index(props) {
  const { order, loading, dispatch } = props;
  const [visible, setVisible] = useState(false);
  const params = useParams();

  const columns = [
    {
      title: <span className={styles.tableHeaderText}>商品</span>,
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div style={{ display: 'flex' }}>
          <img src={record.img} alt="img" style={{ width: 50 }} />
          <div style={{ marginLeft: 10 }}>
            <span>{record.order_item_name}</span>
            <br />
            <span>SKU: {record.sku}</span>
          </div>
        </div>
      ),
    },
    {
      title: <span className={styles.tableHeaderText}>规格</span>,
      dataIndex: 'order_item_type',
      key: 'order_item_type',
    },
    {
      title: <span className={styles.tableHeaderText}>售价*数量</span>,
      dataIndex: 'subtotal',
      key: 'subtotal',
      render: (text, record) => (
        <span>
          ￥{record.price}*{record.qty}
        </span>
      ),
    },
    {
      title: <span className={styles.tableHeaderText}>总售价</span>,
      dataIndex: 'line_total',
      key: 'line_total',
      // render: (text, record) => (
      //   <span>{record.price * record.quantity}</span>
      // )
    },
    {
      title: <span className={styles.tableHeaderText}>折扣</span>,
      dataIndex: 'discount',
      key: 'discount',
      render: (text, record) => (
        <span>{parseFloat(record.line_subtotal - record.line_total).toFixed(2)}</span>
      ),
    },
  ];

  useEffect(() => {
    dispatch({
      type: 'orderData/fetchOrder',
      payload: params.id,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContainer>
      <div
        style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 17, marginRight: 2 }}
      >
        <Button type="primary" onClick={() => setVisible(true)} loading={loading}>
          {order.fulfillment_status === 'fulfilled' ? '修改发货' : '发货'}
        </Button>
      </div>
      <Row gutter={[16, 16]}>
        <Col span={14}>
          <Row gutter={[16, 16]}>
            {/* 商品信息 */}
            <Col span={24}>
              <Table
                columns={columns}
                dataSource={order.line_items}
                bordered={true}
                pagination={false}
                rowKey={(record) => record.id}
                loading={loading}
              />
            </Col>
            {/* 订单总览 */}
            <Col span={24}>
              <Card className={styles.orderOverview} loading={loading}>
                <span>订单总览</span>
                <div className={styles.item}>
                  <div>
                    <span>小计</span>
                    <span>1项</span>
                  </div>
                  <div>￥ {39.98}</div>
                </div>
                <div className={styles.item}>
                  <div>
                    <span>折扣</span>
                    <span>--</span>
                  </div>
                  <div>-￥ {0.0}</div>
                </div>
                <div className={styles.item}>
                  <div>
                    <span>运费</span>
                    <span>包邮</span>
                  </div>
                  <div>+￥ {0.0}</div>
                </div>
                <div className={styles.item}>
                  <div>
                    <span>运费险</span>
                    <span>--</span>
                  </div>
                  <div>+￥ {0.0}</div>
                </div>
                <div className={styles.item} style={{ borderBottomWidth: 0, paddingBottom: 0 }}>
                  <div>
                    <span>总计</span>
                  </div>
                  <div>￥ {36.98}</div>
                </div>
              </Card>
            </Col>
            {/* 收货地址 */}
            <Col span={24}>
              <Card className={styles.addressWrapper} loading={loading}>
                <span>收货地址</span>
                <div className={styles.item}>
                  <span>姓名</span>
                  <span>
                    {order.shipping_address.first_name} {order.shipping_address.last_name}
                  </span>
                </div>
                <div className={styles.item}>
                  <span>电话</span>
                  <span>{order.shipping_address.phone}</span>
                </div>
                <div className={styles.item}>
                  <span>地址</span>
                  <span>{order.shipping_address.address_index}</span>
                </div>
                <div className={styles.item}>
                  <span>邮编</span>
                  <span>{order.shipping_address.postcode}</span>
                </div>
                <div className={styles.item} style={{ borderBottomWidth: 0, paddingBottom: 0 }}>
                  <span>邮箱</span>
                  <span>{order.shipping_address.email}</span>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
        {/* 订单信息 */}
        <Col span={10}>
          <Card className={styles.orderInfoWrapper} loading={loading}>
            <span style={{ fontWeight: 'bold', fontSize: 17 }}>订单信息</span>
            <div className={styles.div}>
              <div>
                <span className={styles.label}>订单状态:</span>
                <span>{order.post_status}</span>
              </div>
              <div>
                <span className={styles.label}>订单总额:</span>
                <span style={{ fontSize: 18, fontWeight: 'bold' }}>￥{order.order_total}</span>
              </div>
            </div>

            <div className={styles.div}>
              <div>
                <span className={styles.label}>订单编号:</span>
                <span>{order.number}</span>
              </div>
              <div>
                <span className={styles.label}>支付编号:</span>
                <span>ED46548F45646</span>
              </div>
              <div>
                <span className={styles.label}>支付渠道:</span>
                <span>{order.payment_method_title}</span>
              </div>
              <div>
                <span className={styles.label}>生成时间:</span>
                <span>{order.timeline[0].date_gmt}</span>
              </div>
              <div>
                <span className={styles.label}>付款时间:</span>
                <span>{order.paid_date}</span>
              </div>
              <div>
                <span className={styles.label}>物流单号:</span>
                <span
                  style={{ display: order.fulfillment_status === 'fulfilled' ? 'block' : 'none' }}
                >
                  {order.shippings[0].order_item_id}
                </span>
              </div>
              <div>
                <span className={styles.label}>发货时间:</span>
                <span
                  style={{ display: order.fulfillment_status === 'fulfilled' ? 'block' : 'none' }}
                >
                  2020-02-12 11:36:00
                </span>
              </div>
            </div>

            <div className={styles.div} style={{ borderBottomWidth: 0, paddingBottom: 0 }}>
              <div>
                <span className={styles.label}>买家备注:</span>
                <span>---</span>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <Modal
        visible={visible}
        title="发货"
        centered
        onCancel={() => setVisible(false)}
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', height: 34 }}>
            <Form.Item>
              <Button htmlType="reset">取消</Button>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary" style={{ marginLeft: 10 }}>
                确定
              </Button>
            </Form.Item>
          </div>
        }
      >
        <Form>
          <Form.Item initialValue="" name="logisticsNO" label="物流单号">
            <Input placeholder="请输入物流单号" />
          </Form.Item>
          <Form.Item initialValue="" name="sendToCoustomer">
            <Checkbox>发消息给顾客</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
}

export default connect(({ orderData, loading }) => ({
  order: orderData.order,
  loading: loading.effects['orderData/fetchOrder'],
}))(Index);
