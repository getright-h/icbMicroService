import * as React from 'react';
import style from './i-edit-password.component.less';
import { IIEditPasswordProps } from './i-edit-password.interface';
import { Modal, Form, Input } from 'antd';
import { useIEditPasswordStore } from './i-edit-password.component.store';

export default function IEditPasswordComponent(props: IIEditPasswordProps) {
  const { visible } = props;
  const { state, pwdForm, onSubmit, checkConfirmPassword } = useIEditPasswordStore(props);
  const { confirmLoading } = state;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 }
    }
  };

  return (
    <Modal
      width={'30vw'}
      title={'修改密码'}
      visible={visible}
      okText={'保存'}
      onOk={() => {
        pwdForm
          .validateFields()
          .then((values: any) => {
            onSubmit(values);
          })
          .catch((info: any) => {
            console.log('Validate Failed:', info);
          });
      }}
      onCancel={() => {
        props.close();
        pwdForm.resetFields();
      }}
      maskClosable={false}
      destroyOnClose={true}
      confirmLoading={confirmLoading}
    >
      <Form {...formItemLayout} form={pwdForm}>
        <Form.Item label="旧密码" name="oldPassword" rules={[{ required: true }]}>
          <Input placeholder="请输入旧密码" type="password" />
        </Form.Item>
        <Form.Item
          label="新密码"
          name="newPassword"
          rules={[
            { required: true },
            {
              pattern: /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,20}$/,
              message: '密码需为6到20位字符，必须包含字母和数字',
              validateTrigger: 'onChange'
            }
          ]}
        >
          <Input placeholder="请输入新密码" type="password" />
        </Form.Item>
        <Form.Item
          label="确认新密码"
          name="newPasswordConfirm"
          rules={[
            { required: true },
            {
              validator: (rules, value, callback) => {
                checkConfirmPassword(value, callback);
              }
            }
          ]}
        >
          <Input placeholder="请确认新密码" type="password" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
