import { IRejectAllocationState, IRejectAllocationProp } from './reject-allocation.interface';
import { ShowNotification } from '~/framework/util/common';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { ALLOW_FLOW_KEYCODE_ENUM, ModalType } from '~shared/constant/common.const';
import { useEffect } from 'react';
export function useRejectAllocationStore(props: IRejectAllocationProp) {
  const { state, setStateWrap } = useStateStore(new IRejectAllocationState());
  const condition = [
    {
      action: ModalType.REJECT,
      title: '调拨单驳回',
      operate: ALLOW_FLOW_KEYCODE_ENUM.Reject,
      label: '驳回原因',
      placeholder: '请输入驳回原因',
      key: 'rejectAuditRemark',
      msg: '驳回成功'
    },
    {
      action: ModalType.SET_RETURN,
      title: '调拨单退货',
      operate: ALLOW_FLOW_KEYCODE_ENUM.Return,
      label: '退货原因',
      placeholder: '请输入退货原因',
      key: 'returnRemark',
      msg: '退货成功'
    },
    {
      action: ModalType.APPLY_REVOKE,
      title: '申请撤回',
      operate: ALLOW_FLOW_KEYCODE_ENUM.RecallApply,
      label: '撤回理由',

      placeholder: '请输入撤回理由',
      key: 'rejectAuditRemark',
      msg: '撤回成功'
    }
  ];
  async function submit() {
    const { id, allotId } = props.data;
    const { currentCondition } = state;
    const params: any = {
      id,
      allotId,
      ...state.searchForm,
      operation: currentCondition.operate
    };
    console.log(params);
    if (!params.id || !params[currentCondition.key] || !params.allotId || !params.operation) {
      ShowNotification.warning('提交失败,请完善信息');
      return;
    }
    setStateWrap({ submitLoading: true });
    props.allocationOperate &&
      props
        .allocationOperate(props.data, params)
        .then((res: any) => {
          const { isSuccess } = res;
          if (isSuccess) {
            props.getTableData && props.getTableData();
            props.getAlloactionDetail && props.getAlloactionDetail(props.data.id);
            ShowNotification.success(currentCondition.msg);
          }
          setStateWrap({ submitLoading: false });
          props.close && props.close();
        })
        .catch((error: any) => {
          console.log(error);
          setStateWrap({ submitLoading: false });
          props.close && props.close();
        });
  }

  function onchange(value: any, valueType: string) {
    const { searchForm } = state;
    setStateWrap({
      searchForm: {
        ...searchForm,
        [valueType]: value
      }
    });
  }
  useEffect(() => {
    setStateWrap({
      currentCondition: condition.find((item: any) => item.action === props.currentActionType)
    });
  }, [props.data.id]);
  return { state, submit, onchange };
}
