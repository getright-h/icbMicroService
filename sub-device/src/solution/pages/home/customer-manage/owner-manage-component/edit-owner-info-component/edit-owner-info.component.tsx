import * as React from 'react';
import style from './edit-owner-info.component.less';
import { useEditOwnerInfoStore } from './edit-owner-info.component.store';
import { IEditOwnerInfoProps } from './edit-owner-info.interface';
import { Modal, Form, Input, Select, Radio, Cascader } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { IAreaCascaderComponent } from '~/framework/components/component.module';

export default function EditOwnerInfoComponent(props: IEditOwnerInfoProps) {
  const { state, form, toggleShowMore, selfSubmit, selfClose } = useEditOwnerInfoStore(props);
  const { visible } = props;
  const { confirmLoading, hasMore } = state;
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };
  function renderForm() {
    return (
      <React.Fragment>
        <Form {...layout} form={form}>
          <Form.Item name="name" label="车主姓名" rules={[{ required: true }]}>
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item name="name" label="车主电话" rules={[{ required: true }]}>
            <Input placeholder="请输入电话" />
          </Form.Item>
          <Form.Item name="name" label="车主性别">
            <Radio.Group>
              <Radio value={1}>男</Radio>
              <Radio value={2}>女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="name" label="证件类型">
            <Select placeholder="请选择证件类型">
              <Select.Option value={1}>身份证</Select.Option>
              <Select.Option value={2}>护照</Select.Option>
              <Select.Option value={3}>行驶证</Select.Option>
              <Select.Option value={4}>军官证</Select.Option>
              <Select.Option value={5}>统一社会信用代码</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="name" label="证件号">
            <Input placeholder="请输入证件号" />
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
            <Input placeholder="请输入车主年龄" />
          </Form.Item>
          <Form.Item name="name" label="工作领域">
            <Cascader placeholder="请选择工作领域" />
          </Form.Item>
          <Form.Item name="name" label="备用电话">
            <Input placeholder="请输入备用电话" />
          </Form.Item>
          <Form.Item name="name" label="电子邮箱">
            <Input placeholder="请输入电子邮箱" />
          </Form.Item>
          <Form.Item name="name" label="地址">
            <IAreaCascaderComponent
              deep={2}
              setAreaInfo={(value, options) => {
                console.log(value, options);
              }}
            />
            <Input placeholder="请输入详细地址" />
          </Form.Item>
          <Form.Item name="name" label="客服跟进方式">
            <Select placeholder="请选择跟进方式">
              <Select.Option value={1}>1</Select.Option>
              <Select.Option value={2}>2</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="name" label="备注">
            <Input.TextArea placeholder="请输入备注" />
          </Form.Item>
        </Form>
      </React.Fragment>
    );
  }
  return (
    <Modal
      title="新增车主"
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
      {renderForm()}
      <div className={style.more}>
        <a onClick={toggleShowMore}>完善更多个人信息{hasMore ? <UpOutlined /> : <DownOutlined />}</a>
      </div>
      {hasMore && renderExtraForm()}
    </Modal>
  );
}
