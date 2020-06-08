import React, { useCallback, useEffect } from 'react';
import { LoginStore } from './login.component.store';
import { IProps, IState } from './login.interface';
import style from './login.component.less';
import { LockOutlined, SafetyCertificateOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Checkbox, Button, Form } from 'antd';
// import { CubeComponent } from '~/solution/components/component.module';
import { useStore } from '~/framework/aop/hooks/use-base-store';
import { reducer, initialState } from './store/reducer';
import { setState } from '~/framework/microAPP/appStore';

function LoginComponentOrigin(props: IProps) {
  // 初始化 store
  const store: LoginStore = useStore(LoginStore, props);
  const { state } = store.useReducer<IState>(reducer, initialState);
  const { leftRef, leftCoverRef } = store.useRefs();

  // 设置页面宽高
  const setLeftCoverHeight = useCallback(() => {
    const windowHeight = window.innerHeight;
    const leftRefWidth = leftRef.current.clientWidth;
    const borderWidth = `0 0 ${windowHeight}px ${leftRefWidth / 2}px`;
    leftCoverRef.current.style.borderWidth = borderWidth;
  }, []);

  function sendMessageToFather() {
    setState({
      menuList: 222
    });
  }

  // 事件绑定和解绑
  useEffect(() => {
    setLeftCoverHeight();
    window.addEventListener('resize', setLeftCoverHeight);
    return () => {
      window.removeEventListener('resize', setLeftCoverHeight);
    };
  }, []);
  return (
    <div className={style.main}>
      <section className={style.left} ref={leftRef}>
        {/* <CubeComponent size="80px" top="0" left="10%" />
        <CubeComponent size="50px" top="20%" left="30%" />
        <CubeComponent size="80px" top="40%" left="15%" /> */}
        <div className={style.stage}></div>
        <div className={style.leftCover} ref={leftCoverRef}></div>
      </section>
      <Button onClick={sendMessageToFather}>子应用向父应用通信</Button>
      <section className={style.right}>
        <div>
          <p className={style.welcome}>Hello!</p>
          <p className={style.siteTitleBox}>
            欢迎登录<strong>{process.env.SITE_TITLE}</strong>
          </p>
        </div>
        <div className={style.loginBox}>
          <Form className="login-form" onFinish={store.handleSubmit} initialValues={{ checked: true }}>
            <Form.Item rules={[{ required: true, message: '请输入用户名' }]}>
              <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item rules={[{ required: true, message: '请输入登录密码' }]}>
              <Input prefix={<LockOutlined />} type="password" placeholder="请输入登录密码" />
            </Form.Item>
            <Form.Item className={style.formFlexItem} rules={[{ required: true, message: '请输入验证码' }]}>
              <Input prefix={<SafetyCertificateOutlined />} className={style.vcodeInput} placeholder="请输入验证码" />
              <div className={style.vcodeBox}>验证码</div>
            </Form.Item>
            <Form.Item className={style.formFlexItem} rules={[{ required: true, message: '请输入用户名' }]}>
              <Checkbox>七天内免登录</Checkbox>)<a>忘记密码</a>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={state.loginLoading} className={style.loginBtn}>
                登录
              </Button>
              <a>还没有账号？点击注册</a>
            </Form.Item>
          </Form>
        </div>
      </section>
    </div>
  );
}

const LoginComponent = LoginComponentOrigin;
export default LoginComponent;
