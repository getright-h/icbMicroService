import * as React from 'react';
import style from './owner-info-detail.component.less';
import { useOwnerInfoDetailStore } from './owner-info-detail.component.store';
import { IOwnerInfoDetailProps } from './owner-info-detail.interface';
import { Modal, Form, Input, Select } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

export default function OwnerInfoDetailComponent(props: IOwnerInfoDetailProps) {
  const { state, form, selfSubmit, selfClose, toggleShowMore } = useOwnerInfoDetailStore(props);
  const { visible } = props;
  const { confirmLoading, hasMore, details } = state;
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };
  function renderForm() {
    return (
      <React.Fragment>
        <Form {...layout} form={form}>
          <Form.Item name="name" label="车主姓名" rules={[{ required: true }]}>
            {details}
          </Form.Item>
          <Form.Item name="name" label="车主电话" rules={[{ required: true }]}>
            {details}
          </Form.Item>
          <Form.Item name="name" label="车主性别">
            {details}
          </Form.Item>
          <Form.Item name="name" label="证件类型">
            {details}
          </Form.Item>
          <Form.Item name="name" label="证件号">
            {details}
          </Form.Item>
        </Form>
      </React.Fragment>
    );
  }
  function renderExtraForm() {
    return (
      <React.Fragment>
        <Form {...layout} form={form}>
          <Form.Item name="name" label="车主年龄">
            {details}
          </Form.Item>
          <Form.Item name="name" label="工作领域">
            {details}
          </Form.Item>
          <Form.Item name="name" label="备用电话">
            {details}
          </Form.Item>
          <Form.Item name="name" label="电子邮箱">
            {details}
          </Form.Item>
          <Form.Item name="name" label="地址">
            {details}
          </Form.Item>
          <Form.Item name="name" label="客服跟进方式">
            {details}
          </Form.Item>
          <Form.Item name="name" label="备注">
            {details}
          </Form.Item>
        </Form>
      </React.Fragment>
    );
  }
  return (
    <Modal
      title="标题"
      visible={visible}
      width={600}
      onCancel={selfClose}
      onOk={() => {
        form
          .validateFields()
          .then(values => selfSubmit(values))
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
      maskClosable={false}
      destroyOnClose={true}
      confirmLoading={confirmLoading}
    >
      {/* {details && ( */}
      <React.Fragment>
        {renderForm()}
        <div className={style.more}>
          <a onClick={toggleShowMore}>查看更多个人信息{hasMore ? <UpOutlined /> : <DownOutlined />}</a>
        </div>
        {hasMore && renderExtraForm()}
      </React.Fragment>
      {/* )} */}
    </Modal>
  );
}
