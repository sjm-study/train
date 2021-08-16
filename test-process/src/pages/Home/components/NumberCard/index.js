import React from 'react';
import { Card, Tooltip, Space } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import CountUp from 'react-countup';

import styles from './index.less';

function Index(props) {
  const { loading = false } = props;

  return (
    <Card
      title={props.title}
      extra={
        <Tooltip title="help">
          <InfoCircleOutlined style={{ fontSize: 16, color: 'rgb(107,92,92)' }} />
        </Tooltip>
      }
      loading={loading}
    >
      <CountUp end={props.total} separator={','} className={styles.countNumber} />
      <div className={styles.cardMainContent}>{props.content}</div>
      <Space style={{ marginTop: 15 }} size="middle">
        {props.footText.map((item, index) => {
          // eslint-disable-next-line react/no-array-index-key
          return <span key={index}>{item}</span>;
        })}
      </Space>
    </Card>
  );
}

export default Index;
