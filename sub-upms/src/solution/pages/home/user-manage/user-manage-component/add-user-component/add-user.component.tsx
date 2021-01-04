import React from 'react';
import style from './add-user.component.less';
import { Form, Modal, Input, Radio, Checkbox, Typography } from 'antd';
import { useAddUserStore } from './add-user.component.store';
import { IAddUserProps } from './add-user.interface';
import SelectGroupComponent from './select-group-component/select-group.component';
import { RoleInfo } from '~/solution/model/dto/role-manage.dto';

export default function AddUserComponent(props: IAddUserProps) {
  const { isEdit, isDetail, visible } = props;
  const { state, userForm, onSubmit, handleOrganSelect, sendRelateRoles } = useAddUserStore(props);
  const { confirmLoading, positionRoles, roleOptions } = state;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 9 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 15 }
    }
  };
  function renderBaseInfo() {
    return (
      <div className={style.baseInfo}>
        <Form.List name="organizationIds">
          {(fields, { add, remove }) => {
            return (
              <Form.Item
                label="所属机构"
                required={true}
                className="form-item"
                style={{ width: '90%', alignItems: 'start', marginBottom: 0 }}
                labelCol={{
                  xs: { span: 24 },
                  sm: { span: 3 }
                }}
                wrapperCol={{
                  xs: { span: 24 },
                  sm: { span: 21 }
                }}
              >
                {fields.map((field, index) => (
                  <SelectGroupComponent
                    key={field.key}
                    field={field}
                    index={index}
                    add={add}
                    remove={remove}
                    handleOrganSelect={handleOrganSelect}
                    selectValues={userForm.getFieldValue(['organizationIds', index])}
                    sendRelateRoles={sendRelateRoles}
                  />
                ))}
              </Form.Item>
            );
          }}
        </Form.List>

        <Form.Item label="账号" name="account" className="form-item" rules={[{ required: true }]}>
          <Input placeholder="请输入手机号/用户名" />
        </Form.Item>
        <Form.Item label="姓名" name="name" className="form-item" rules={[{ required: true }]}>
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item
          label="手机号"
          name="telephone"
          className="form-item"
          rules={[
            { required: true },
            {
              pattern: /(^((1[3|5|7|8|9]{1}[0-9]{1})([0-9]{8}))$)|(^([0-9]{3,4}-[0-9]{7,8})$)/,
              message: '请输入正确的电话号码',
              validateTrigger: 'onChange'
            }
          ]}
        >
          <Input placeholder="请输入手机号" />
        </Form.Item>
        {!isEdit && (
          <Form.Item
            label="默认密码"
            name="password"
            className="form-item"
            rules={[
              { required: true },
              {
                pattern: /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,20}$/,
                message: '密码需为6到20位字符，必须包含字母和数字',
                validateTrigger: 'onChange'
              }
            ]}
          >
            <Input placeholder="请输入默认密码" />
          </Form.Item>
        )}

        {isEdit && (
          <Form.Item label="用户状态" name="state" className="form-item" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value={true}>启用</Radio>
              <Radio value={false}>禁用</Radio>
            </Radio.Group>
          </Form.Item>
        )}
        <Form.Item label="备注描述" name="instruction" className="form-item">
          <Input.TextArea style={{ verticalAlign: 'top' }} />
        </Form.Item>
        <br />
        <Form.Item
          label="关联角色"
          name="roleList"
          className="form-item"
          style={{ minWidth: '90%' }}
          labelCol={{
            xs: { span: 24 },
            sm: { span: 3 }
          }}
          wrapperCol={{
            xs: { span: 24 },
            sm: { span: 21 }
          }}
        >
          {roleOptions.length ? (
            <Checkbox.Group>
              {roleOptions.map((role: RoleInfo) => (
                <Checkbox
                  key={role.id}
                  value={JSON.stringify({ roleId: role.id, roleCode: role.originalCode })}
                  disabled={positionRoles.includes(role.id)}
                >
                  {role.name}
                </Checkbox>
              ))}
            </Checkbox.Group>
          ) : (
            <Typography.Text type="danger">当前登录用户无可选关联角色</Typography.Text>
          )}
        </Form.Item>
      </div>
    );
  }
  return (
    <Modal
      width={1000}
      title={isEdit && !isDetail ? '编辑用户' : isDetail ? '用户详情' : '添加用户'}
      visible={visible}
      okText={'保存'}
      onOk={() => {
        userForm
          .validateFields()
          .then(values => {
            onSubmit(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
      onCancel={() => {
        props.close();
        userForm.resetFields();
      }}
      okButtonProps={{ disabled: isDetail }}
      cancelButtonProps={{ disabled: isDetail }}
      maskClosable={false}
      destroyOnClose={true}
      confirmLoading={confirmLoading}
    >
      <div className={style.lineContainer}>
        <Form {...formItemLayout} form={userForm} initialValues={{ organizationIds: [{}] }}>
          {renderBaseInfo()}
        </Form>
      </div>
    </Modal>
  );
}
