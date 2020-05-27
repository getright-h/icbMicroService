import * as React from 'react';
import { useHomeHeaderStore } from './i-home-header.component.store';
import { Popover, Icon, Modal, Form, Input } from 'antd';
import style from './i-home-header.component.less';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { TYPES } from '~/solution/context/global/store/global.type';
import { IGlobalState } from '~/solution/context/global/global.interface';
import { IHomeHeaderProps } from './i-home-header.interface';

function IHomeHeaderComponentForm(props: IHomeHeaderProps) {
  const { getFieldDecorator } = props.form;
  const { state, logout, changePwd, handleOk, handleCancel, handleConfirmBlur } = useHomeHeaderStore(props);
  const { gState, dispatch }: IGlobalState = React.useContext(GlobalContext);

  function validateToNextPassword(rule: any, value: any, callback: any, source?: any, options?: any) {
    const { form } = props;
    if (value && state.confirmDirty) {
      form.validateFields(['confirmPassword'], { force: true });
    }
    callback();
  }
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };

  function compareToFirstPassword(rule: any, value: any, callback: any) {
    const { form } = props;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('两次输入的密码不一致!');
    } else {
      callback();
    }
  }

  function changePasswordModal() {
    return (
      <Modal
        title="Basic Modal"
        confirmLoading={state.confirmLoading}
        visible={state.visibleModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form {...formItemLayout}>
          <Form.Item label="当前密码" hasFeedback>
            {getFieldDecorator('oldPassword', {
              rules: [
                {
                  required: true,
                  message: '请输入当前密码!'
                },
                {
                  validator: validateToNextPassword
                }
              ]
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="新密码" hasFeedback>
            {getFieldDecorator('newPassword', {
              rules: [
                {
                  required: true,
                  message: '请输入新密码!'
                },
                {
                  validator: validateToNextPassword
                }
              ]
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="确认密码" hasFeedback>
            {getFieldDecorator('confirmPassword', {
              rules: [
                {
                  required: true,
                  message: '请输入确认密码!'
                },
                {
                  validator: compareToFirstPassword
                }
              ]
            })(<Input.Password onBlur={handleConfirmBlur} />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }

  function renderActionContent() {
    return (
      <div className="actions">
        <a onClick={logout} className="a-link">
          注销
        </a>
        <p></p>
        <a onClick={changePwd} className="a-link">
          修改密码
        </a>
      </div>
    );
  }
  return (
    <div className={style.header}>
      <div className={style.main}>
        <div className={style.container}>
          <div className={style.headerLeft}>
            <div className={style.logoContainer}>
              <div className={style.foldIcon} onClick={() => dispatch({ type: TYPES.SET_COLLAPSED })}>
                <Icon className={style.trigger} type={gState.collapsed ? 'menu-unfold' : 'menu-fold'} />
              </div>
              <div className={style.headerLogo}>
                {/* <img src={logo} /> */}
                <span>{process.env.SITE_TITLE}</span>
              </div>
            </div>
          </div>
          <div className={style.headerRight}>
            <Popover content={renderActionContent()} placement="bottom">
              <Icon type="setting" />
            </Popover>
          </div>
        </div>
      </div>
      {changePasswordModal()}
    </div>
  );
}

export const IHomeHeaderComponent = Form.create({ name: 'changePassword' })(IHomeHeaderComponentForm);
