import React from 'react';
import style from './approval-template-form-modal.component.less';
import { useApprovalTemplateFormModalStore } from './approval-template-form-modal.component.store';
import { PageHeader, Input, Button, Spin } from 'antd';
import { FormType } from '../../appraval-template-component/add-template-component/add-template-redux/add-template-reducer';
import AssignDeviceComponent from '~/solution/components/FormBusinessComponent/assign-device-component/assign-device.component';
import FlowNodeComponent from '../../../../../components/FormBusinessComponent/flow-node-component/flow-node.component';
import { AllotNodeFlowInput } from '~/solution/model/dto/allocation-template.dto';
import { ControlList } from '~/solution/model/dto/approval-manage.dto';
import { ITypeInfo } from '~/solution/components/FormBusinessComponent/assign-device-component/assign-device.interface';
import ApprovalerListComponent from '~/solution/components/FormBusinessComponent/approvaler-list-component/approvaler-list.component';

export default function ApprovalTemplateFormModalComponent() {
  const { state, getFlowNodeSettingFieldReturn, goBack, submitApproval, isEdit } = useApprovalTemplateFormModalStore();
  const { formTemplate, submitLoading } = state;
  // const { templateName, controlList } = formTemplate;
  const GlobalComponent = {
    [FormType.Input]: Input,
    [FormType.FlowNode]: FlowNodeComponent,
    [FormType.AssignDevice]: AssignDeviceComponent
  };

  function getCurrentComponentProps(controll: ControlList) {
    let props: {} = {
      style: { width: '500px' },
      placeholder: `请输入${controll.controlKey}`,
      title: controll.controlKey,
      value: controll.controlValue,
      onChange: ($event: any) => getFlowNodeSettingFieldReturn(controll, $event.target.value)
    };
    if (controll.type == FormType.FlowNode) {
      props = {
        ...props,
        flowNodeSettingField: controll.controlValue,
        postCurrentChooseInfo: (flowNodeSettingFieldReturn: AllotNodeFlowInput[]) =>
          getFlowNodeSettingFieldReturn(controll, flowNodeSettingFieldReturn)
      };
    }
    if (controll.type == FormType.AssignDevice) {
      props = {
        ...props,
        handleDeviceChange: (typeInfo: ITypeInfo[]) => getFlowNodeSettingFieldReturn(controll, typeInfo)
      };
    }
    return props;
  }

  return (
    <Spin tip="Loading..." spinning={!formTemplate?.templateName}>
      <div className={style.formModalPage}>
        <PageHeader title={formTemplate?.templateName} />
        <div className={style.formModal}>
          {formTemplate?.controlList.map(controll => {
            const props = getCurrentComponentProps(controll);
            const ComponentInfo = GlobalComponent[controll.type];
            return (
              <div
                key={controll.controlKey}
                style={{
                  width: '100%',
                  display: controll.type !== FormType.FlowNode && 'flex',
                  marginTop: '10px',
                  textAlign: 'start'
                }}
              >
                {controll.isRequired && <span style={{ color: 'red', lineHeight: '32px' }}>*</span>}
                <span style={{ margin: '0 10px', lineHeight: '32px', width: '100px' }}>{controll.controlKey}: </span>
                <ComponentInfo {...props} />
              </div>
            );
          })}
          {formTemplate?.approverList && (
            <div style={{ display: 'flex' }}>
              <span style={{ margin: '0 13px', lineHeight: '32px', width: '100px' }}>审批人: </span>
              <ApprovalerListComponent approverInput={formTemplate?.approverList} />
            </div>
          )}
        </div>

        <Button type="primary" onClick={submitApproval} loading={submitLoading} className={style.submitButton}>
          {!isEdit ? '提交审批' : '编辑审批'}
        </Button>
        <Button onClick={goBack}>取消</Button>
      </div>
    </Spin>
  );
}
