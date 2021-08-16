/* eslint-disable global-require */
/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Row, Col, Card, Space, Tooltip, DatePicker } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import NumberCard from './components/NumberCard/index';
import { Chart, Area, Interval, Line, Axis, Geom } from 'bizcharts';
import { useIntl, FormattedMessage } from 'umi';
import moment from 'moment';
import numeral from 'numeral';
import { getInfoData } from '@/services/home';
import styles from './index.less';

const { RangePicker } = DatePicker;

function Index() {
  const intl = useIntl();
  const [summary, setSummary] = useState({ base: {} });
  const [loading, setLoading] = useState(false);

  const scale = {
    value: {
      min: 10000,
      nice: true,
    },
    year: {
      range: [0, 1],
    },
  };

  const data = [
    { year: '1991', value: 15 },
    { year: '1992', value: 16 },
    { year: '1993', value: 11 },
    { year: '1994', value: 11 },
    { year: '1995', value: 18 },
    { year: '1996', value: 14 },
    { year: '1997', value: 19 },
    { year: '1998', value: 14 },
    { year: '1999', value: 19 },
  ];

  const levelData = [
    {
      name: 'XXX秋季上衣',
      sales: 30016,
    },
    {
      name: 'XXX秋季上衣2',
      sales: 30016,
    },
    {
      name: 'XXX秋季上衣3',
      sales: 30,
    },
    {
      name: 'XXX秋季上衣1',
      sales: 3016,
    },
    {
      name: 'XXX秋季上衣',
      sales: 30016,
    },
    {
      name: 'XXX秋季上衣2',
      sales: 30016,
    },
    {
      name: 'XXX秋季上衣3',
      sales: 30016,
    },
  ];

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current > moment().endOf('day');
  };

  useEffect(() => {
    setLoading(true);
    getInfoData().then((response) => {
      setSummary(response.summary);
      setLoading(false);
    });
  }, []);

  return (
    <PageContainer>
      {/* 四个卡片 */}
      <Row gutter={[16, 16]}>
        <Col lg={6}>
          <NumberCard
            total={summary.base.sales}
            title={intl.formatMessage({
              id: 'pages.home.TotalSales',
              defaultMessage: 'TotalSales',
            })}
            loading={loading}
            footText={[
              intl.formatMessage({ id: 'pages.home.DailySales' }),
              `￥${numeral(125236).format('0,0')}`,
            ]}
            content={
              <Space size="middle">
                <span>{intl.formatMessage({ id: 'pages.home.WoWChange' })}</span>
                <span>
                  <CaretUpOutlined style={{ color: 'green' }} />
                  12%
                </span>
                <span>{intl.formatMessage({ id: 'pages.home.DoDChange' })}</span>
                <span>
                  <CaretDownOutlined style={{ color: '#eb1700' }} /> 11%
                </span>
              </Space>
            }
          />
        </Col>
        <Col lg={6}>
          <NumberCard
            total={summary.base.orders}
            title={<FormattedMessage id="pages.home.totalOrder" />}
            loading={loading}
            footText={[
              <FormattedMessage id="pages.home.incrementsToday" />,
              `${numeral(125236).format('0,0')}`,
            ]}
            content={
              <Chart scale={scale} data={data} autoFit>
                <Area position="year*value" />
                <Line position="year*value" />
                <Axis name="year" visible={false} />
                <Axis name="value" visible={false} />
              </Chart>
            }
          />
        </Col>
        <Col lg={6}>
          <NumberCard
            total={126590}
            title={<FormattedMessage id="pages.home.totalUser" />}
            loading={loading}
            footText={[
              <FormattedMessage id="pages.home.incrementsToday" />,
              `${numeral(125236).format('0,0')}`,
            ]}
            content={
              <Chart data={data} autoFit>
                <Interval position="year*value" />
                <Axis name="year" visible={false} />
                <Axis name="value" visible={false} />
              </Chart>
            }
          />
        </Col>
        <Col lg={6}>
          <NumberCard
            total={126590}
            loading={loading}
            title={<FormattedMessage id="pages.home.unshippedOrders" />}
            footText={[
              <FormattedMessage id="pages.home.deliveryRate" />,
              `${numeral(125236).format('0,0')}`,
            ]}
            content={
              <div className={styles.miniProgress}>
                <Tooltip title={'targetLabel'}>
                  <div
                    className={styles.target}
                    style={{
                      left: '70%',
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: 'rgb(19, 194, 194)',
                      }}
                    />
                    <span
                      style={{
                        backgroundColor: 'rgb(19, 194, 194)',
                      }}
                    />
                  </div>
                </Tooltip>
                <div className={styles.progressWrap}>
                  <div
                    className={styles.progress}
                    style={{
                      backgroundColor: 'rgb(19, 194, 194)',
                      width: '68%',
                      height: 8,
                    }}
                  />
                </div>
              </div>
            }
          />
        </Col>
      </Row>

      {/* 订单趋势 */}
      <div>
        <Card
          style={{ width: '100%' }}
          tabList={[{ key: '订单趋势', tab: <FormattedMessage id="pages.home.orderTrend" /> }]}
          activeTabKey={'订单趋势'}
          tabBarExtraContent={<RangePicker disabledDate={disabledDate} />}
          className={styles.orderCard}
        >
          <div className={styles.orderCardMainWrapper}>
            <div style={{ width: '66%' }}>
              <p style={{ fontWeight: 'bold', fontSize: 15 }}>
                <FormattedMessage id="pages.home.orderTrend" />
              </p>
              <Chart data={data} autoFit>
                <Interval position="year*value" />
              </Chart>
            </div>
            <div style={{ width: '25%' }}>
              <p style={{ fontWeight: 'bold', fontSize: 15 }}>
                <FormattedMessage id="pages.home.salesRanking" />
              </p>
              {levelData.map((item, index) => {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={index} className={styles.level}>
                    <div className={styles.name}>
                      <span className={index <= 2 ? styles.active : ''}>{index + 1}</span>
                      <span>{item.name}</span>
                    </div>
                    <div className={styles.paiming}>
                      <span>{numeral(item.sales).format('0,0')}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>

      {/* 用户增长  销售额增长 */}
      <Row gutter={[16, 16]}>
        {/* 用户增长 */}
        <Col span={12}>
          <Card
            style={{ width: '100%' }}
            tabList={[
              { key: '用户日增长', tab: <FormattedMessage id="pages.home.dailyUserGrowth" /> },
            ]}
            activeTabKey={'用户日增长'}
            className={styles.orderCard}
          >
            <span style={{ color: 'rgb(180,180,180)' }}>
              <FormattedMessage id="pages.home.incrementsYesterday" />
            </span>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: 24, color: 'grey', marginRight: 50 }}>6</span>
              <span style={{ color: 'rgb(180,180,180)' }}>17.1%</span>
              <CaretUpOutlined style={{ color: '#eb1700', marginLeft: 10 }} />
            </div>

            <div style={{ marginTop: 30 }}>
              <Chart scale={scale} data={data} autoFit height={300}>
                {/* <Line position="year*value" /> */}
                <Geom type="line" position="year*value" shape="smooth" />
              </Chart>
            </div>
            <div style={{ marginTop: 30, display: 'flex', alignItems: 'center' }}>
              <img
                src={require('../../assets/tilde.png')}
                alt="tilde"
                style={{ width: 15, marginRight: 5 }}
              />
              <span style={{ color: 'rgb(180,180,180)' }}>2020-08-10 00:00~2020-08-10 23:00</span>
              <img
                src={require('../../assets/tilde_1.png')}
                alt="tilde"
                style={{ width: 15, marginLeft: 5, marginRight: 5 }}
              />
              <span style={{ color: 'rgb(180,180,180)' }}>2020-08-9 00:00~2020-08-9 23:00</span>
            </div>
          </Card>
        </Col>
        {/* 销售额日增长 */}
        <Col span={12}>
          <Card
            style={{ width: '100%' }}
            tabList={[
              { key: '销售额日增长', tab: <FormattedMessage id="pages.home.dailySalesGrowth" /> },
            ]}
            activeTabKey={'销售额日增长'}
            className={styles.orderCard}
          >
            <span style={{ color: 'rgb(180,180,180)' }}>
              <FormattedMessage id="pages.home.todaySales" />
            </span>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: 24, color: 'grey', marginRight: 50 }}>6</span>
              <span style={{ color: 'rgb(180,180,180)' }}>17.1%</span>
              <CaretUpOutlined style={{ color: '#eb1700', marginLeft: 10 }} />
            </div>

            <div style={{ marginTop: 30 }}>
              <Chart scale={scale} data={data} autoFit height={300}>
                {/* <Line position="year*value" /> */}
                <Geom type="line" position="year*value" shape="smooth" />
              </Chart>
            </div>
            <div style={{ marginTop: 30, display: 'flex', alignItems: 'center' }}>
              <img
                src={require('../../assets/tilde.png')}
                alt="tilde"
                style={{ width: 15, marginRight: 5 }}
              />
              <span style={{ color: 'rgb(180,180,180)' }}>2020-08-10 00:00~2020-08-10 23:00</span>
              <img
                src={require('../../assets/tilde_1.png')}
                alt="tilde"
                style={{ width: 15, marginLeft: 5, marginRight: 5 }}
              />
              <span style={{ color: 'rgb(180,180,180)' }}>2020-08-9 00:00~2020-08-9 23:00</span>
            </div>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
}

export default Index;
