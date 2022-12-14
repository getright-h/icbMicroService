import * as React from 'react';
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
                label="ζε±ζΊζ"
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

        <Form.Item label="θ΄¦ε·" name="account" className="form-item" rules={[{ required: true }]}>
          <Input placeholder="θ―·θΎε₯ζζΊε·/η¨ζ·ε" />
        </Form.Item>
        <Form.Item label="ε§ε" name="name" className="form-item" rules={[{ required: true }]}>
          <Input placeholder="θ―·θΎε₯ε§ε" />
        </Form.Item>
        <Form.Item
          label="ζζΊε·"
          name="telephone"
          className="form-item"
          rules={[
            { required: true },
            {
              pattern: /(^((1[3|5|7|8|9]{1}[0-9]{1})([0-9]{8}))$)|(^([0-9]{3,4}-[0-9]{7,8})$)/,
              message: 'θ―·θΎε₯ζ­£η‘?ηη΅θ―ε·η ',
              validateTrigger: 'onChange'
            }
          ]}
        >
          <Input placeholder="θ―·θΎε₯ζζΊε·" />
        </Form.Item>
        {!isEdit && (
          <Form.Item
            label="ι»θ?€ε―η "
            name="password"
            className="form-item"
            rules={[
              { required: true },
              {
                pattern: /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{8,20}$/,
                message: (
                  <>
                    <span>ε―η ιδΈΊ8ε°20δ½ε­η¬¦,</span>
                    <br />
                    <span>εΏι‘»εε«ε­ζ―εζ°ε­</span>
                  </>
                ),
                validateTrigger: 'onChange'
              }
            ]}
          >
            <Input placeholder="θ―·θΎε₯ι»θ?€ε―η " />
          </Form.Item>
        )}

        {isEdit && (
          <Form.Item label="η¨ζ·ηΆζ" name="state" className="form-item" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value={true}>ε―η¨</Radio>
              <Radio value={false}>η¦η¨</Radio>
            </Radio.Group>
          </Form.Item>
        )}
        <Form.Item label="ε€ζ³¨ζθΏ°" name="instruction" className="form-item">
          <Input.TextArea style={{ verticalAlign: 'top' }} />
        </Form.Item>
        <br />
        <Form.Item
          label="ε³θθ§θ²"
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
            <Typography.Text type="danger">ε½εη»ε½η¨ζ·ζ ε―ιε³θθ§θ²</Typography.Text>
          )}
        </Form.Item>
      </div>
    );
  }
  return (
    <Modal
      width={1000}
      title={isEdit && !isDetail ? 'ηΌθΎη¨ζ·' : isDetail ? 'η¨ζ·θ―¦ζ' : 'ζ·»ε η¨ζ·'}
      visible={visible}
      okText={'δΏε­'}
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
