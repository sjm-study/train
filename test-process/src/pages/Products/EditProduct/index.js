import React, { useState } from 'react';
import { Card, Form, Input, Select, Tag, Divider, Radio, Upload, Button } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import Tinymce from '@/components/Tinymce';

import styles from './index.less';

function Index() {
  const [selectOption, setSelectOption] = useState([
    { label: 'lala', value: 'gold' },
    { value: 'lime' },
    { value: 'green' },
    { value: 'cyan' },
  ]);
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);
  const tagRender = (PROP) => {
    const { label, value, closable, onClose } = PROP;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag color={value} onMouseDown={onPreventMouseDown} closable={closable} onClose={onClose}>
        {label}
      </Tag>
    );
  };

  const addItem = () => {
    setSelectOption((pre) => pre.concat({ label: 'ppp', value: 'red' }));
  };

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
          <span style={{ fontWeight: 'bold', fontSize: 17, display: 'block', marginBottom: 10 }}>
            基础信息
          </span>
          <Form.Item
            name="name"
            label={<span className={styles.formLabelText}>商品名称</span>}
            initialValue=""
          >
            <Input className={styles.formInput} />
          </Form.Item>
          <Form.Item
            name="price"
            label={<span className={styles.formLabelText}>价格</span>}
            initialValue=""
          >
            <Input
              className={styles.formInput}
              style={{ width: 250 }}
              addonBefore={<div>￥</div>}
            />
          </Form.Item>
          <Form.Item
            name="sku"
            label={<span className={styles.formLabelText}>SKU</span>}
            initialValue=""
          >
            <Input className={styles.formInput} />
          </Form.Item>
          <Form.Item
            name="type"
            label={<span className={styles.formLabelText}>商品分类</span>}
            initialValue={[]}
          >
            <Select
              mode="multiple"
              showArrow
              tagRender={tagRender}
              style={{ width: 500 }}
              options={selectOption}
              dropdownRender={(menu) => (
                <div>
                  {menu}
                  <Divider style={{ margin: '4px 0' }} />
                  <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                    <Input style={{ flex: 'auto' }} value={'123'} />
                    <a
                      style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                      onClick={addItem}
                    >
                      <PlusOutlined /> Add item
                    </a>
                  </div>
                </div>
              )}
            />
          </Form.Item>
          <Form.Item
            name="label"
            label={<span className={styles.formLabelText}>商品标签</span>}
            initialValue={[]}
          >
            <Select
              mode="multiple"
              showArrow
              tagRender={tagRender}
              style={{ width: 500 }}
              options={selectOption}
              dropdownRender={(menu) => (
                <div>
                  {menu}
                  <Divider style={{ margin: '4px 0' }} />
                  <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                    <Input style={{ flex: 'auto' }} value={'123'} />
                    <a
                      style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                      onClick={addItem}
                    >
                      <PlusOutlined /> Add item
                    </a>
                  </div>
                </div>
              )}
            />
          </Form.Item>
          <Form.Item
            name="shelf"
            label={<span className={styles.formLabelText}>是否上架</span>}
            initialValue=""
          >
            <Radio.Group>
              <Radio value={1}>上架</Radio>
              <Radio value={2}>下架</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="img"
            label={<span className={styles.formLabelText}>商品图片</span>}
            initialValue=""
          >
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
        </Card>
        {/* 商品详情 */}
        <Card style={{ marginTop: 20 }}>
          <span style={{ fontWeight: 'bold', fontSize: 17, display: 'block', marginBottom: 10 }}>
            商品详情
          </span>
          <Form.Item>
            <Tinymce />
          </Form.Item>
        </Card>
        {/* 保存取消按钮 */}
        <Form.Item style={{ float: 'right', marginTop: 40 }}>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
          <Button type="default" htmlType="reset" style={{ marginLeft: 10 }}>
            取消
          </Button>
        </Form.Item>
      </Form>
    </PageContainer>
  );
}

export default Index;
