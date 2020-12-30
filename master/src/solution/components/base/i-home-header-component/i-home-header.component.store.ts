import { StorageUtil } from '~/framework/util/storage';
import { createHashHistory } from 'history';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { IHomeHeader } from './i-home-header.interface';
import { FocusEvent } from 'react';
import { HomeService } from '~/solution/model/services/home.service';
import { useService } from '../../../../framework/aop/hooks/use-base-store';
import { Form, message } from 'antd';

export function useHomeHeaderStore() {
  const { state, setStateWrap } = useStateStore(new IHomeHeader());
  const [form] = Form.useForm();
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
    form
      .validateFields()
      .then((values: any) => {
        setStateWrap({ confirmLoading: true });
        homeService.changePassword(values).subscribe(
          () => {
            message.success('修改成功！');
            setStateWrap({ visibleModal: false, confirmLoading: false });
          },
          () => {
            setStateWrap({ confirmLoading: false });
          }
        );
      })
      .catch((info: any) => {
        console.log('Validate Failed:', info);
      });
  }

  return { state, form, logout, changePwd, handleCancel, handleOk, handleConfirmBlur };
}
