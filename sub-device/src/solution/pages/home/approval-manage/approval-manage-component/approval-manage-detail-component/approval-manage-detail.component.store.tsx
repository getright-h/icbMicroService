import { IApprovalManageDetailState, CHECK_VALID_OBJECT, FormTemplateInfo } from './approval-manage-detail.interface';
import { useStateStore, useService } from '~/framework/aop/hooks/use-base-store';
import { DoError } from '~/framework/util/common/doError';
import { message } from 'antd';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { ApprovalManageService } from '~/solution/model/services/approval-manage.service';
import { useEffect } from 'react';
import { FormType } from '../../appraval-template-component/add-template-component/add-template-redux/add-template-reducer';
import { AllotNodeFlowInput } from '~/solution/model/dto/allocation-template.dto';
import confirm from 'antd/lib/modal/confirm';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export function useApprovalManageDetailStore() {
  const { state, setStateWrap } = useStateStore(new IApprovalManageDetailState());
  const { id, isDeal }: { id: string, isDeal:string } = useParams();
  const { remark, isRefuse } = state;

  const approvalManageService: ApprovalManageService = useService(ApprovalManageService);

  useEffect(() => {
    queryApprovalInstanceDetail();
  }, []);

  function queryApprovalInstanceDetail() {
    approvalManageService.flowInfo({ id }).subscribe(res => {
      const info: FormTemplateInfo = res;
      info.instanceForm.controlList = info.instanceForm.controlList.map(controll => {
        if (FormType.FlowNode == controll.type) {
          let controlValue: AllotNodeFlowInput[] = JSON.parse(controll.controlValue);
          controlValue = controlValue.filter(item => {
            item.attributeList = item.attributeList.filter(itemChild => {
              return !!itemChild.storePositionName && !!itemChild.isSelected;
            });
            return !!item?.attributeList.length;
          });
          controll.controlValue = controlValue as any;
        }

        return controll;
      });

      setStateWrap({
        formTemplate: info
      });
    });
  }

  function goBack() {
    history.back();
  }

  function cancelApproval() {
    confirm({
      title: '撤回',
      icon: <ExclamationCircleOutlined />,
      content: '是否撤回当前申请',
      okText: '撤回',
      onOk() {
        return new Promise(resolve => {
          confirmWithdrawApproval(resolve);
        });
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  }

  function confirmWithdrawApproval(resolve: Function) {
    approvalManageService.flowRevoke({ id }).subscribe(() => {
      history.back();
      resolve();
    });
  }

  function refuseOrPassApproval(isRefuse?: boolean) {
    setStateWrap({
      isRefuse: !!isRefuse,
      visible: true
    });
  }

  function onRemarkChange(value: string) {
    setStateWrap({
      remark: value
    });
  }

  function handleCancel() {
    setStateWrap({
      visible: false,
      remark: ''
    });
  }

  function handleOk() {
    const messageInfo = DoError.checkIsError(CHECK_VALID_OBJECT, state);

    if (messageInfo) {
      message.warning(messageInfo);
      return;
    } else {
      setStateWrap({
        confirmLoading: true
      });
      approvalManageService
        .flowProcess({
          id,
          remark,
          passed: !isRefuse
        })
        .subscribe(
          () => {
            message.success('修改状态成功');
            setStateWrap({
              confirmLoading: false
            });
            history.back();
          },
          () => {
            setStateWrap({
              confirmLoading: false
            });
          }
        );
    }
    setStateWrap({
      visible: true
    });
  }

  return { state, refuseOrPassApproval, cancelApproval, goBack, onRemarkChange, handleOk, handleCancel, isDeal };
}
