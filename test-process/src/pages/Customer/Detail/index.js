import React, { useState } from 'react';
import { Row, Col, Card, Modal } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import Pagination from '@/components/Pagination';

import styles from './index.less';

function Index() {
  const [visible, setVisible] = useState(false);

  return (
    <PageContainer>
      <Row gutter={[16, 16]}>
        <Col span={14}>
          <Row gutter={[16, 16]}>
            {/* 顾客信息 */}
            <Col span={24}>
              <Card className={styles.orderOverview}>
                <span>顾客信息</span>
                <div className={styles.item}>
                  <div>
                    <span>姓名</span>
                    <span>王五</span>
                  </div>
                </div>
                <div className={styles.item}>
                  <div>
                    <span>电话</span>
                    <span>15558563256</span>
                  </div>
                </div>
                <div className={styles.item}>
                  <div>
                    <span>地区</span>
                    <span>福建福州</span>
                  </div>
                </div>
                <div className={styles.item}>
                  <div>
                    <span>顾客类型</span>
                    <span>会员</span>
                  </div>
                </div>
                <div className={styles.item}>
                  <div>
                    <span>加入时间</span>
                    <span>2020-02-15 11:00:00</span>
                  </div>
                </div>
                <div className={styles.item}>
                  <div>
                    <span>总单量</span>
                    <span>1</span>
                  </div>
                </div>
                <div className={styles.item} style={{ borderBottomWidth: 0, paddingBottom: 0 }}>
                  <div>
                    <span>总消费</span>
                    <span>36.95</span>
                  </div>
                </div>
              </Card>
            </Col>
            {/* 历史订单 */}
            <Col span={24}>
              <Card
                className={styles.historyOder}
                title={<span style={{ fontSize: 17, fontWeight: 'bold' }}>历史订单</span>}
                actions={[
                  // eslint-disable-next-line react/jsx-key
                  <div style={{ paddingLeft: 24, paddingRight: 24 }}>
                    <Pagination
                      total={40}
                      pageConfig={{ limit: 10, page: 1 }}
                      showSizeChanger={true}
                    />
                  </div>,
                ]}
              >
                <div className={styles.wrapper}>
                  <div className={styles.header}>
                    <span>
                      <span style={{ color: '#3051A6' }}>订单编号：</span>548565465456
                    </span>
                    <span>2020-02-02 11:00:00</span>
                  </div>
                  <div className={styles.content}>
                    <Row gutter={[16, 16]} align="middle">
                      <Col span={3}>
                        <img
                          src={
                            'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3419276493,3061530094&fm=26&gp=0.jpg'
                          }
                          alt="img"
                          style={{ width: '100%' }}
                        />
                      </Col>
                      <Col span={9}>
                        <span>商品名XXXXX1</span>
                        <br />
                        <span>SKU: ZE15112123-BL</span>
                      </Col>
                      <Col span={3}>
                        <span>Black / XXL</span>
                      </Col>
                      <Col span={3}>
                        <span>￥36.98*1</span>
                      </Col>
                      <Col span={3}>
                        <span>￥36.98</span>
                      </Col>
                      <Col span={3}>
                        <span>￥0.00</span>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className={styles.wrapper} style={{ marginTop: 20 }}>
                  <div className={styles.header}>
                    <span>
                      <span style={{ color: '#3051A6' }}>订单编号：</span>548565465456
                    </span>
                    <span>2020-02-02 11:00:00</span>
                  </div>
                  <div className={styles.content}>
                    <Row gutter={[16, 16]} align="middle">
                      <Col span={3}>
                        <img
                          src={
                            'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3419276493,3061530094&fm=26&gp=0.jpg'
                          }
                          alt="img"
                          style={{ width: '100%' }}
                        />
                      </Col>
                      <Col span={9}>
                        <span>商品名XXXXX1</span>
                        <br />
                        <span>SKU: ZE15112123-BL</span>
                      </Col>
                      <Col span={3}>
                        <span>Black / XXL</span>
                      </Col>
                      <Col span={3}>
                        <span>￥36.98*1</span>
                      </Col>
                      <Col span={3}>
                        <span>￥36.98</span>
                      </Col>
                      <Col span={3}>
                        <span>￥0.00</span>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className={styles.wrapper} style={{ marginTop: 20 }}>
                  <div className={styles.header}>
                    <span>
                      <span style={{ color: '#3051A6' }}>订单编号：</span>548565465456
                    </span>
                    <span>2020-02-02 11:00:00</span>
                  </div>
                  <div className={styles.content}>
                    <Row gutter={[16, 16]} align="middle">
                      <Col span={3}>
                        <img
                          src={
                            'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3419276493,3061530094&fm=26&gp=0.jpg'
                          }
                          alt="img"
                          style={{ width: '100%' }}
                        />
                      </Col>
                      <Col span={9}>
                        <span>商品名XXXXX1</span>
                        <br />
                        <span>SKU: ZE15112123-BL</span>
                      </Col>
                      <Col span={3}>
                        <span>Black / XXL</span>
                      </Col>
                      <Col span={3}>
                        <span>￥36.98*1</span>
                      </Col>
                      <Col span={3}>
                        <span>￥36.98</span>
                      </Col>
                      <Col span={3}>
                        <span>￥0.00</span>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
        {/* 收货地址 */}
        <Col span={10}>
          <Card className={styles.addressWrapper}>
            <span>收货地址</span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className={styles.item}>
                <span>姓名:</span>
                <span>韩梅梅</span>
              </div>
              <span
                style={{
                  color: 'rgb(13, 100, 6)',
                  border: '1px solid rgb(13, 100, 6)',
                  borderRadius: 10,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              >
                默认地址
              </span>
            </div>
            <div className={styles.item}>
              <span>电话:</span>
              <span>15132153132</span>
            </div>
            <div className={styles.item}>
              <span>地址:</span>
              <span>福建省福州市</span>
            </div>
            <div className={styles.item}>
              <span>邮编:</span>
              <span>350000</span>
            </div>
            <div className={styles.footer} onClick={() => setVisible(true)}>
              <a>更多地址</a>
            </div>
          </Card>
        </Col>
      </Row>
      <Modal
        title="收货地址"
        visible={visible}
        width={600}
        onCancel={() => setVisible(false)}
        onOk={() => setVisible(false)}
      >
        <div
          className={styles.modalAddressWrapper}
          style={{ borderBottom: '1px solid rgb(218, 218, 218)', marginBottom: 20 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>收货地址1</span>
            <span
              style={{
                color: 'rgb(13, 100, 6)',
                border: '1px solid rgb(13, 100, 6)',
                borderRadius: 10,
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              默认地址
            </span>
          </div>
          <div className={styles.item}>
            <span>姓名:</span>
            <span>韩梅梅</span>
          </div>
          <div className={styles.item}>
            <span>电话:</span>
            <span>15132153132</span>
          </div>
          <div className={styles.item}>
            <span>地址:</span>
            <span>福建省福州市</span>
          </div>
          <div className={styles.item}>
            <span>邮编:</span>
            <span>350000</span>
          </div>
        </div>
        <div className={styles.modalAddressWrapper}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>收货地址1</span>
            <span
              style={{
                color: 'rgb(13, 100, 6)',
                border: '1px solid rgb(13, 100, 6)',
                borderRadius: 10,
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              默认地址
            </span>
          </div>
          <div className={styles.item}>
            <span>姓名:</span>
            <span>韩梅梅</span>
          </div>
          <div className={styles.item}>
            <span>电话:</span>
            <span>15132153132</span>
          </div>
          <div className={styles.item}>
            <span>地址:</span>
            <span>福建省福州市</span>
          </div>
          <div className={styles.item}>
            <span>邮编:</span>
            <span>350000</span>
          </div>
        </div>
      </Modal>
    </PageContainer>
  );
}

export default Index;
