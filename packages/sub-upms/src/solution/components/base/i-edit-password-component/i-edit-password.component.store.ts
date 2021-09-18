import { IIEditPasswordState, IIEditPasswordProps } from './i-edit-password.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { Form } from 'antd';
import { UserManageService } from '~/solution/model/services/user-manage.service';
import { ShowNotification } from '~/framework/util/common';

export function useIEditPasswordStore(props: IIEditPasswordProps) {
  const userManageService: UserManageService = useService(UserManageService);
  const { state, setStateWrap } = useStateStore(new IIEditPasswordState());
  const [pwdForm] = Form.useForm();

  function onSubmit(values: any) {
    setStateWrap({ confirmLoading: true });
    const { oldPassword, newPassword } = values;
    userManageService.updatePassword({ oldPassword, newPassword, userId: props.userId }).subscribe(
      (res: any) => {
        ShowNotification.success('密码已修改！');
        props.close();
        setStateWrap({ confirmLoading: false });
        pwdForm.resetFields();
      },
      (err: any) => {
        ShowNotification.error(err);
        setStateWrap({ confirmLoading: false });
      }
    );
  }
  function checkConfirmPassword(value: string, callback: (error?: any) => void) {
    const loginpass = pwdForm.getFieldValue('newPassword');
    if (loginpass && loginpass !== value) {
      callback(new Error('两次密码输入不一致'));
    } else {
      callback();
    }
  }
  return { state, pwdForm, onSubmit, checkConfirmPassword };
}
