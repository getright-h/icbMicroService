import { IApprovalTemplateFormModalState } from './approval-template-form-modal.interface';
import { useService, useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { ApprovalManageService } from '~/solution/model/services/approval-manage.service';
import { AllotNodeFlowInput } from '~/solution/model/dto/allocation-template.dto';
import { ControlList } from '~/solution/model/dto/approval-manage.dto';
import { FormType } from '../../appraval-template-component/add-template-component/add-template-redux/add-template-reducer';
import { ITypeInfo } from '~/solution/components/FormBusinessComponent/assign-device-component/assign-device.interface';
import { ShowNotification } from '~/framework/util/common';
import { message } from 'antd';

export function useApprovalTemplateFormModalStore() {
  const { state, setStateWrap, getState } = useStateStore(new IApprovalTemplateFormModalState());
  const { id, groupName, groupId, isEdit }: any = useParams();
  const approvalManageService: ApprovalManageService = useService(ApprovalManageService);
  const responseInfo: any = useRef({});
  useEffect(() => {
    //获取当前的template 信息
    !isEdit ? getCurrentTemplateInfo() : getCurrentEditApprovalInfo();
  }, []);

  // 获取编辑的信息
  function getCurrentEditApprovalInfo() {
    approvalManageService.flowInfo({ id }).subscribe(res => {
      responseInfo.current = res;
      res.instanceForm.controlList = res.instanceForm.controlList.map((control: any) => {
        if (!control.id) {
          control.id = createRandomId();
        }
        if (control.type == FormType.FlowNode) {
          const flowNodeValue: AllotNodeFlowInput[] = JSON.parse(control.controlValue);
          control.controlValue = flowNodeValue as any;
        }

        if (control.type == FormType.AssignDevice) {
          let deviceData = JSON.parse(control.controlValue);
          deviceData = deviceData.map((item: any) => {
            item.typeId = { value: item.typeId, label: item.typeName };
            return item;
          });
          control.controlValue = deviceData as any;
        }
        return control;
      });
      setStateWrap({
        formTemplate: res.instanceForm
      });
    });
  }

  function getCurrentTemplateInfo() {
    approvalManageService.queryApprovalFormDetail({ id }).subscribe(res => {
      res.controlList = res.controlList.map(control => {
        if (!control.id) {
          control.id = createRandomId();
        }
        if (control.type == FormType.FlowNode) {
          let flowNodeValue: AllotNodeFlowInput[] = JSON.parse(control.controlValue);
          flowNodeValue = flowNodeValue.map(item => {
            item.attributeList.map((itemChild, index) => {
              !index && (itemChild.isSelected = true);
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
    let messageText = '';
    submitInfo.controlList = JSON.parse(JSON.stringify(state.formTemplate?.controlList));
    submitInfo.controlList = submitInfo.controlList.map((control: any) => {
      if (control.isRequired && !control.controlValue) {
        !messageText && (messageText = `请输入${control.controlKey}`);
      }
      if (control.type == FormType.AssignDevice && control.controlValue) {
        if (Array.isArray(control.controlValue)) {
          control.controlValue = control.controlValue.map((item: any) => {
            item.typeName = item.typeId.label;
            item.typeId = item.typeId.value;
            return item;
          });
        } else {
          !messageText && (messageText = `请输入${control.controlKey}`);
        }
      }

      if (control.type == FormType.FlowNode) {
        const flowNodeValue: AllotNodeFlowInput[] = control.controlValue;
        flowNodeValue.forEach(item => {
          item.attributeList.forEach((itemChild, index) => {
            if (itemChild.isSelected) {
              if (!itemChild.storePositionName) {
                !messageText && (messageText = '请输入流程节点中已经勾选子节点的仓位信息');
              }
            }
          });
        });
      }

      if (typeof control.controlValue !== 'string') {
        control.controlValue = JSON.stringify(control.controlValue);
      }
      return control;
    });
    if (messageText) {
      message.info(messageText);
      return;
    }
    isEdit && (submitInfo.id = id);
    submitInfo.groupName = isEdit ? responseInfo.current.groupName : groupName;
    submitInfo.groupId = isEdit ? responseInfo.current.groupId : groupId;
    submitInfo.templateId = isEdit ? responseInfo.current.templateId : state.formTemplate.id;
    submitInfo.templateName = isEdit ? responseInfo.current.templateName : state.formTemplate.templateName;
    setStateWrap({
      submitLoading: true
    });
    const URL = isEdit ? 'flowEdit' : 'flowCreate';
    approvalManageService[URL]({ ...state.formTemplate, ...submitInfo }).subscribe(
      () => {
        setStateWrap({
          submitLoading: false
        });
        ShowNotification.info(`${isEdit ? '编辑' : '提交'}审批成功`);
        history.back();
      },
      () => {
        setStateWrap({
          submitLoading: false
        });
      }
    );
  }

  function goBack() {
    history.back();
  }

  return { state, goBack, submitApproval, getFlowNodeSettingFieldReturn, isEdit };
}
