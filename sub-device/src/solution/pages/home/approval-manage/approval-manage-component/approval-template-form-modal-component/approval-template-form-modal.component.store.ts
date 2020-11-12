import { IApprovalTemplateFormModalState } from './approval-template-form-modal.interface';
import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { ApprovalManageService } from '~/solution/model/services/approval-manage.service';
import { AllotNodeFlowInput } from '~/solution/model/dto/allocation-template.dto';
import { ControlList } from '~/solution/model/dto/approval-manage.dto';
import { FormType } from '../../appraval-template-component/add-template-component/add-template-redux/add-template-reducer';
import { ITypeInfo } from '~/solution/components/FormBusinessComponent/assign-device-component/assign-device.interface';
import { message } from 'antd';
import { ShowNotification } from '~/framework/util/common';

export function useApprovalTemplateFormModalStore() {
  const { state, setStateWrap, getState } = useStateStore(new IApprovalTemplateFormModalState());
  const { id, groupName, groupId }: any = useParams();
  const approvalManageService: ApprovalManageService = useService(ApprovalManageService);
  useEffect(() => {
    //获取当前的template 信息
    getCurrentTemplateInfo();
  }, []);

  function getCurrentTemplateInfo() {
    approvalManageService.queryApprovalFormDetail({ id }).subscribe(res => {
      res.controlList = res.controlList.map(control => {
        if (!control.id) {
          control.id = createRandomId();
        }
        if (control.type == FormType.FlowNode) {
          let flowNodeValue: AllotNodeFlowInput[] = JSON.parse(control.controlValue);
          flowNodeValue = flowNodeValue.map(item => {
            item.attributeList.map(itemChild => {
              itemChild.isSelected = true;
              return itemChild;
            });
            return item;
          });
          control.controlValue = flowNodeValue as any;
        }
        return control;
      });
      setStateWrap({
        formTemplate: res
      });
    });
  }

  function createRandomId() {
    return (
      (Math.random() * 10000000).toString(16).substr(0, 4) +
      '-' +
      new Date().getTime() +
      '-' +
      Math.random()
        .toString()
        .substr(2, 5)
    );
  }

  function getFlowNodeSettingFieldReturn(controll: ControlList, value: AllotNodeFlowInput[] | ITypeInfo[]) {
    controll.controlValue = value as any;
    const controlList = getState().formTemplate.controlList.map(controlItem => {
      if (controlItem.id == controll.id) {
        return controll;
      }
      return controlItem;
    });

    setStateWrap({
      formTemplate: {
        ...getState().formTemplate,
        controlList
      }
    });
  }

  function submitApproval() {
    const submitInfo: any = {};
    submitInfo.controlList = state.formTemplate?.controlList?.map((control: any) => {
      if (control.type == FormType.AssignDevice) {
        control.controlValue = control.controlValue.map((item: any) => {
          item.typeName = item.typeId.label;
          item.typeId = item.typeId.value;

          return item;
        });
      }
      if (typeof control.controlValue !== 'string') {
        control.controlValue = JSON.stringify(control.controlValue);
      }
      return control;
    });
    submitInfo.groupName = groupName;
    submitInfo.groupId = groupId;
    submitInfo.templateId = state.formTemplate.id;
    approvalManageService.flowCreate({ ...state.formTemplate, ...submitInfo }).subscribe(() => {
      ShowNotification.info('提交审批成功');
      history.back();
    });
  }

  function goBack() {
    history.back();
  }

  return { state, goBack, submitApproval, getFlowNodeSettingFieldReturn };
}
