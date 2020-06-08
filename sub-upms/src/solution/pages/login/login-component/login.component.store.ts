import { DepUtil } from '~/framework/aop/inject';
import { LoginService } from '~/solution/model/services/login.service';
import { LoginParam } from '~/solution/model/dto/login.dto';
import React, { useRef } from 'react';
import { IProps, IState } from './login.interface';
import { setLoadingAction } from './store/action';
import { message } from 'antd';
import { ReducerStore } from '~/framework/aop/hooks/use-base-store';

export class LoginStore extends ReducerStore<IState> {
  @DepUtil.Inject(LoginService)
  private readonly loginService: LoginService;

  constructor(readonly props: IProps) {
    super(props);
  }

  // 初始化 ref
  useRefs = () => {
    const leftRef = useRef(null);
    const leftCoverRef = useRef(null);
    return {
      leftRef,
      leftCoverRef
    };
  };

  // 登陆
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.dispatch(setLoadingAction(true));

    // 获取请求参数
    const { getFieldsValue } = this.props.form;
    const formValues = getFieldsValue();
    const params = {
      username: formValues.username,
      password: formValues.password,
      vcode: formValues.vcode,
      vcodeKey: 'vcodeKey'
    };

    // 登陆操作
    this.handleLogin(params);
  };

  // 执行登陆
  handleLogin = (params: LoginParam) => {
    return this.loginService.login(params).subscribe(() => {
      message.success('登录成功');
      this.dispatch(setLoadingAction(false));
      this.props.history.push('/home');
    });
  };
}
