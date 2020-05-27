import { StorageUtil } from '~/framework/util/storage';
import { createHashHistory } from 'history';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { IHomeHeader, IHomeHeaderProps } from './i-home-header.interface';
import { FocusEvent } from 'react';
import { HomeService } from '~/solution/model/services/home.service';
import { useService } from '../../../../framework/aop/hooks/use-base-store';
import { message } from 'antd';

export function useHomeHeaderStore(props: IHomeHeaderProps) {
  const { state, setStateWrap } = useStateStore(new IHomeHeader());
  const homeService = useService(HomeService);

  function logout() {
    // 清除cookie 返回登录界面
    StorageUtil.removeLocalStorage('TOKEN');
    createHashHistory().push('/login');
  }

  function changePwd() {
    setStateWrap({ visibleModal: true });
  }

  function handleConfirmBlur(e: FocusEvent<HTMLInputElement>) {
    const { value } = e.target;
    setStateWrap({ confirmDirty: state.confirmDirty || !!value });
  }

  function handleCancel() {
    setStateWrap({ visibleModal: false });
  }

  function handleOk() {
    setStateWrap({ confirmLoading: true });
    props.form.validateFields((err, values) => {
      homeService.changePassword(values).subscribe(
        () => {
          message.success('修改成功！');
          setStateWrap({ visibleModal: false, confirmLoading: false });
        },
        () => {
          setStateWrap({ confirmLoading: false });
        }
      );
    });
  }

  return { state, logout, changePwd, handleCancel, handleOk, handleConfirmBlur };
}
