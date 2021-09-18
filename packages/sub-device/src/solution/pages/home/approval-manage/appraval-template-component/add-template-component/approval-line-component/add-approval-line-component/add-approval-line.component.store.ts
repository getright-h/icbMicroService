import { IAddApprovalLineState, AddApprovalLineComponentProps } from './add-approval-line.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useForm } from 'antd/lib/form/Form';

export function useAddApprovalLineStore(props: AddApprovalLineComponentProps) {
  const { state, setStateWrap } = useStateStore(new IAddApprovalLineState());
  const [form] = useForm();
  const { setAddAddApprovalLineVisible, addUserInfo } = props;
  function handleCancel() {
    setAddAddApprovalLineVisible(false);
  }

  function handleOk() {
    // 添加成员
    addUserInfo(state);
    setAddAddApprovalLineVisible(false);
  }

  function getCurrentSelectInfo(value: any, info: any, key: string) {
    setStateWrap({
      [key]: info
    });
  }

  function onValuesChange(changedValues: { mode: number }) {
    if (changedValues.mode) {
      setStateWrap({
        currentMode: changedValues.mode
      });
    }
  }
  return { state, handleOk, handleCancel, form, onValuesChange, getCurrentSelectInfo };
}
