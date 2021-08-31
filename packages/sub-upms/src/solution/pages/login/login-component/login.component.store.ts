import { DepUtil } from '~/framework/aop/inject';
import { LoginService } from '~/solution/model/services/login.service';
import { LoginParam, VCodeInfo } from '~/solution/model/dto/login.dto';
import { useRef } from 'react';
import { IProps, IState } from './login.interface';
import { setLoadingAction, setVcode } from './store/action';
import { message } from 'antd';
import { ReducerStore } from '~/framework/aop/hooks/use-base-store';
import { Store } from 'antd/lib/form/interface';
import { ShowNotification } from '~/framework/util/common';
import { StorageUtil } from '~/framework/util/storage';

export class LoginStore extends ReducerStore<IState> {
  @DepUtil.Inject(LoginService)
  private readonly loginService: LoginService;
  private codeKey = '';

  constructor(readonly props: IProps) {
    super(props);
    this.getVcode();
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

  // 获取验证码
  getVcode = () => {
    this.loginService.getVerificationCode(this.codeKey).subscribe((res: VCodeInfo) => {
      this.dispatch(setVcode(res.codeImgBase64));
      this.codeKey = res.sessionId;
    });
  };

  // 登陆
  handleSubmit = (values: Store) => {
    console.log(values);
    this.dispatch(setLoadingAction(true));

    // 获取请求参数
    const params = {
      account: values.account,
      password: values.password,
      verificationCodeInfo: {
        sessionId: this.codeKey,
        codeStrValue: values.vcode
      }
    };

    // 登陆操作
    this.handleLogin(params);
  };

  // 执行登陆
  handleLogin = (params: LoginParam) => {
    return this.loginService.login(params).subscribe(
      res => {
        StorageUtil.setLocalStorage('token', res.token);
        message.success('登录成功');
        this.dispatch(setLoadingAction(false));
        this.props.history.push('/account');
      },
      err => {
        ShowNotification.error(err);
        this.dispatch(setLoadingAction(false));
        this.getVcode();
      }
    );
  };
}
