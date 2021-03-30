import { IApprovalApplyState, IApprovalApplyProps } from './approval-apply.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { message } from 'antd';

export function useApprovalApplyStore(props: IApprovalApplyProps) {
  const { state, setStateWrap } = useStateStore(new IApprovalApplyState());
  const { handlePropsOk, changeVisible } = props;
  function setGroupId(value: { label: string; key: string }) {
    if (!value) return;
    setStateWrap({ curGroupId: value.key || '', curGroupName: value.label });
  }

  function setTemplateId(value: { label: string; key: string }) {
    setStateWrap({ curTemplateId: value.key || '' });
  }

  function handleOk() {
    if (state.curTemplateId) {
      handlePropsOk(state);
    } else {
      message.info('请选择模板');
    }
  }

  function handleCancel() {
    changeVisible(false);
  }

  return { state, setGroupId, setTemplateId, handleOk, handleCancel };
}
