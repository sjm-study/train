import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  List,
  Modal,
  Divider,
  Select,
  Upload,
  Button,
  Space,
  Table,
} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { CloseOutlined } from '@ant-design/icons';
import Tinymce from '@/components/Tinymce';
import Pagination from '@/components/Pagination';

import styles from './index.less';

const { Option } = Select;

function Index() {
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);

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

  const [visible, setVisible] = useState(false);

  const columns = [
    {
      // title: '分类',
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
      // title: '商品数量',
      dataIndex: 'number',
      key: 'number',
    },
  ];

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <PageContainer>
      <Form labelAlign="right">
        {/* 基础信息 */}
        <Card>
          <span className={styles.formLabelText}>分类名称</span>
          <Form.Item name="name" initialValue="">
            <Input className={styles.formInput} />
          </Form.Item>
          <span className={styles.formLabelText}>商品图片</span>
          <Form.Item name="img" initialValue="">
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
            >
              {fileList.length >= 0 && '增加图片'}
            </Upload>
          </Form.Item>
          <span className={styles.formLabelText}>分类描述</span>
          <Form.Item>
            <Tinymce />
          </Form.Item>
        </Card>
        <Card
          title={
            <span className={styles.formLabelText} style={{ width: 'auto' }}>
              关联商品
            </span>
          }
          style={{ marginTop: 24 }}
          extra={<Button type="primary">添加关联商品</Button>}
        >
          <List
            itemLayout="horizontal"
            dataSource={dataSource}
            renderItem={(item) => (
              <List.Item
                extra={
                  <a>
                    <CloseOutlined style={{ fontSize: 15, marginRight: 20 }} />
                  </a>
                }
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: 15, marginLeft: 20, marginRight: 20 }}>{item.id}</span>
                  <img src={item.img} alt="img" style={{ width: 50 }} />
                  <span style={{ fontSize: 15, marginLeft: 20 }}>{item.name}</span>
                </div>
              </List.Item>
            )}
          />
        </Card>
        <Divider />
        <Form.Item style={{ float: 'right' }}>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
          <Button type="defalut" htmlType="reset" style={{ marginLeft: 10 }}>
            取消
          </Button>
        </Form.Item>
      </Form>
      <Modal
        visible={visible}
        title="关联商品"
        centered
        width={700}
        onCancel={() => setVisible(true)}
      >
        <Form>
          <Space>
            <Form.Item initialValue="all" name="orderStatus">
              <Select onChange={() => {}}>
                <Option value="all">全部分类</Option>
                <Option value="doing">衣服</Option>
                <Option value="complete">裤子</Option>
                <Option value="cancel">鞋子</Option>
              </Select>
            </Form.Item>
            <Form.Item initialValue="all" name="deliveryStatus">
              <Select onChange={() => {}}>
                <Option value="all">全部标签</Option>
                <Option value="delivery">已发货</Option>
                <Option value="undelivery">未发货</Option>
              </Select>
            </Form.Item>
            <Form.Item name="name" initialValue="">
              <Input placeholder="请输入商品名或SKU" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </Form.Item>
          </Space>
        </Form>
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey={(record) => record.id}
          pagination={false}
          rowSelection={{
            type: 'checkbox',
          }}
        ></Table>
        <Pagination total={5} pageConfig={{ limit: 10, page: 1 }} />
      </Modal>
    </PageContainer>
  );
}

export default Index;
