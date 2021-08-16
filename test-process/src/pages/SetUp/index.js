/* eslint-disable global-require */
import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Tabs,
  Card,
  Form,
  Input,
  Button,
  Table,
  Popconfirm,
  Typography,
  InputNumber,
  Row,
  Col,
  Switch,
} from 'antd';
import styles from './index.less';

const { TabPane } = Tabs;

function Index() {
  const originData = [];

  for (let i = 0; i < 5; i += 1) {
    originData.push({
      key: i.toString(),
      name: `Edrward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    });
  }

  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState(''); // 编辑时的table key

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    // eslint-disable-next-line no-empty
    } catch (errInfo) {}
  };

  const columns = [
    {
      title: '方案名称',
      dataIndex: 'name',
      width: '45%',
      editable: true,
    },
    {
      title: '运费',
      dataIndex: 'age',
      width: '35%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              // href=""
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              保存
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              编辑
            </Typography.Link>
            <Typography.Link
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
              style={{ marginLeft: 20 }}
            >
              删除
            </Typography.Link>
          </span>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const addNewClass = () => {
    const list = data;
    list.push({ key: new Date().getTime(), name: '', age: '' });
    setData([...data]);
    edit({ key: new Date().getTime(), name: '', age: '' });
  };

  return (
    <PageContainer>
      <Card>
        <Tabs defaultActiveKey="3" tabPosition="left" style={{ height: 600 }}>
          <TabPane tab="安全设置" key="1">
            <span style={{ fontWeight: 'bold', fontSize: 16 }}>修改密码</span>
            <div style={{ width: 500 }}>
              <Form labelAlign="right" style={{ marginTop: 10 }}>
                <Form.Item
                  name="oldPass"
                  label={<span className={styles.formLabelText}>当前密码</span>}
                >
                  <Input.Password
                    placeholder="请输入当前密码"
                    visibilityToggle={false}
                    style={{ width: 400, fontSize: 15 }}
                  />
                </Form.Item>
                <Form.Item
                  name="newPass"
                  label={<span className={styles.formLabelText}>新密码</span>}
                >
                  <Input.Password
                    placeholder="请输入新密码"
                    visibilityToggle={false}
                    style={{ width: 400, fontSize: 15 }}
                  />
                </Form.Item>
                <Form.Item
                  name="confirmPass"
                  label={<span className={styles.formLabelText}>确认新密码</span>}
                >
                  <Input.Password
                    placeholder="请再次输入新密码"
                    visibilityToggle={false}
                    style={{ width: 400, fontSize: 15 }}
                  />
                </Form.Item>
                <Form.Item style={{ textAlign: 'center' }}>
                  <Button type="primary" htmlType="submit">
                    保存
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </TabPane>

          <TabPane tab="物流设置" key="2">
            <span style={{ fontWeight: 'bold', fontSize: 16 }}>物流方案</span>
            <Form form={form} component={false}>
              <Table
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                // pagination={{
                //   onChange: cancel,
                // }}
                pagination={false}
              />
              <div style={{ textAlign: 'center', marginTop: 25 }}>
                <a onClick={addNewClass}>+新增方案</a>
              </div>
            </Form>
          </TabPane>

          <TabPane tab="支付设置" key="3">
            <Card
              title={<span style={{ fontWeight: 'bold', fontSize: 16 }}>快速结账</span>}
              extra={<img src={require('@/assets/paypal.png')} />}
            >
              <Row gutter={[16, 16]} align="middle">
                <Col span={12} style={{ borderRight: '1px solid rgb(218, 218, 218)' }}>
                  <Form labelAlign="left" labelCol={{ span: 4 }}>
                    <Form.Item>
                      <Switch />
                      <span
                        style={{
                          fontSize: 17,
                          marginTop: 3,
                          display: 'inline-block',
                          marginLeft: 10,
                        }}
                      >
                        sandbox
                      </span>
                    </Form.Item>
                    <Form.Item name="userName" label="Username" required>
                      <Input style={{ width: 300, fontSize: 15 }} />
                    </Form.Item>
                    <Form.Item name="password" label="Password" required>
                      <Input style={{ width: 300, fontSize: 15 }} />
                    </Form.Item>
                    <Form.Item name="signature" label="Signature" required>
                      <Input style={{ width: 300, fontSize: 15 }} />
                    </Form.Item>
                  </Form>
                </Col>

                <Col span={12}>
                  <div style={{ marginLeft: 40 }}>
                    <p>个人账号快速绑定指引</p>
                    <a>设置或关联已存在的PayPal沙盒账户</a>
                  </div>
                </Col>
              </Row>
            </Card>
          </TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
}

export default Index;
