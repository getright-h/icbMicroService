import { IRollbackApplyState, IRollbackApplyProps } from './rollback-apply.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';
import { Form } from 'antd';
import { AllocationManageService } from '~/solution/model/services/allocation-manage.service';
import { ShowNotification } from '~/framework/util/common';
import { ALLOW_FLOW_KEYCODE_ENUM, ModalType } from '~shared/constant/common.const';

import { Subscription, from } from 'rxjs';
export function useRollbackApplyStore(props: IRollbackApplyProps) {
  const { state, setStateWrap } = useStateStore(new IRollbackApplyState());
  const [form] = Form.useForm();
  const allocationManageService: AllocationManageService = new AllocationManageService();

  let allocationManageServiceSubscription: Subscription;

  function selfClose() {
    form.resetFields();
    props.close && props.close();
  }
  function opinionSelect(value: number) {
    setStateWrap({ opinion: value });
  }

  function selfSubmit() {
    const { id, allotId } = props.data;

    const { opinion } = state;
    const params: any = {
      id,
      allotId,
      operation: !!opinion ? ALLOW_FLOW_KEYCODE_ENUM.RecallAuditPass : ALLOW_FLOW_KEYCODE_ENUM.RecallAuditReject
    };

    if (params.operation === undefined) {
      ShowNotification.warning('提交失败,请完善信息');
      return;
    }
    setStateWrap({ confirmLoading: true });
    props.allocationOperate &&
      props
        .allocationOperate(props.data, params)
        .then((res: any) => {
          const { isSuccess } = res;
          if (isSuccess) {
            props.getTableData && props.getTableData();
            ShowNotification.success(!!opinion ? '通过成功' : '拒绝成功');
          }
          setStateWrap({ confirmLoading: false });
          props.close && props.close();
        })
        .catch((error: any) => {
          console.log(error);
          setStateWrap({ confirmLoading: false });
          props.close && props.close();
        });
  }

  //获取调拨单详情
  function getAlloactionDetail() {
    const { id } = props.data;
    if (!id) return;
    allocationManageServiceSubscription = allocationManageService.queryAllPromoterDetail({ id }).subscribe(
      (res: any) => {
        const { rejectAuditRemark = '', state = '' } = res;
        setStateWrap({
          rejectAuditRemark,
          status: state
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  useEffect(() => {
    getAlloactionDetail();
  }, [props.data.id]);

  return { state, form, selfSubmit, selfClose, opinionSelect };
}
