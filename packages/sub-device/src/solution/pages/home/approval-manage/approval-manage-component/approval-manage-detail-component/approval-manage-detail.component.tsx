import * as React from 'react';
import style from './approval-manage-detail.component.less';
import { useApprovalManageDetailStore } from './approval-manage-detail.component.store';
import { PageHeader, Button, Modal, Input, Spin, Table } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { FormType } from '../../appraval-template-component/add-template-component/add-template-redux/add-template-reducer';
import FlowChartComponent from '~/framework/components/flow-chart-component/flow-chart.component';
import { ControlList } from '~/solution/model/dto/approval-manage.dto';
import ApprovalerListComponent from '~/solution/components/FormBusinessComponent/approvaler-list-component/approvaler-list.component';
import AssignDeviceShowComponent from '~/solution/components/FormBusinessComponent/assign-device-show-component/assign-device-show.component';
import { APPROVAL_APPLY_STATUS_ENUM } from '~/solution/shared/constant/common.const';

export default function ApprovalManageDetailComponent() {
  const {
    state,
    refuseOrPassApproval,
    onRemarkChange,
    cancelApproval,
    handleCancel,
    handleOk,
    goBack,
    isDeal
  } = useApprovalManageDetailStore();
  const { visible, remark, confirmLoading, isRefuse, formTemplate } = state;
  const GlobalComponent = {
    [FormType.Input]: Text,
    [FormType.FlowNode]: FlowChartComponent,
    [FormType.AssignDevice]: AssignDeviceShowComponent
  };

  function Text({ value }: { value: string }) {
    return <span>{value}</span>;
  }

  function getCurrentComponentProps(controll: ControlList) {
    let props: {} = {
      style: { width: '500px' },
      disabled: true,
      placeholder: `请输入${controll.controlKey}`,
      title: controll.controlKey,
      value: controll.controlValue
    };
    if (controll.type == FormType.FlowNode) {
      props = {
        ...props,
        hasChecked: true,
        flowNodeSettingField: controll.controlValue
      };
    }
    if (controll.type == FormType.AssignDevice) {
      props = {
        ...props,
        data: JSON.parse(controll.controlValue)
      };
    }
    return props;
  }

  const columns = [
    {
      title: '审批人',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark'
    }
  ];
  const extra =
    formTemplate?.audit?.processStatus == APPROVAL_APPLY_STATUS_ENUM.Audited && !!Number(isDeal)
      ? [
          <Button key="3" onClick={() => refuseOrPassApproval(true)} danger>
            审核驳回
          </Button>,
          <Button key="2" onClick={() => refuseOrPassApproval()}>
            审核通过
          </Button>
        ]
      : [];

  return (
    <Spin spinning={!formTemplate?.instanceForm}>
      <PageHeader
        className="site-page-header"
        extra={extra}
        title={!!Number(isDeal) ? formTemplate?.audit?.processStatusText : formTemplate?.statusText}
        subTitle={formTemplate?.instanceForm?.templateName}
      />
      {formTemplate?.instanceForm && (
        <div className={style.formModal}>
          {formTemplate?.instanceForm?.controlList.map(controll => {
            const props = getCurrentComponentProps(controll);
            const ComponentInfo = GlobalComponent[controll.type];
            return (
              <div
                key={controll.controlKey}
                style={{
                  width: '100%',
                  display: 'flex',
                  marginTop: '10px',
                  textAlign: 'start'
                }}
              >
                <span style={{ margin: '0 10px', width: '100px' }}>{controll.controlKey}: </span>
                <ComponentInfo {...props} />
              </div>
            );
          })}
          {formTemplate?.instanceForm?.approverList && (
            <div style={{ display: 'flex' }}>
              <span style={{ margin: '0 13px', lineHeight: '32px', width: '100px' }}>审批人: </span>
              <ApprovalerListComponent approverInput={formTemplate?.instanceForm?.approverList} />
            </div>
          )}
          {
            <div style={{ display: 'flex' }}>
              <span style={{ margin: '20px 13px', lineHeight: '32px', width: '100px' }}>备注: </span>
              <Table
                style={{ marginBottom: '15px', marginTop: '16px' }}
                columns={columns}
                pagination={false}
                bordered
                dataSource={formTemplate?.remarks}
              />
            </div>
          }
          <div style={{ textAlign: 'center' }}>
            {formTemplate?.status == APPROVAL_APPLY_STATUS_ENUM.Auditing && !Number(isDeal) && (
              <Button type="primary" onClick={cancelApproval} className={style.submitButton}>
                撤销
              </Button>
            )}
            <Button onClick={goBack}>取消</Button>
          </div>
        </div>
      )}
      <Modal
        title={isRefuse ? '审核驳回' : '审核通过'}
        centered={true}
        visible={visible}
        okText={`确认${isRefuse ? '驳回' : '通过'}`}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {/* <span className={style.remark}>备注</span> */}
        <span>备注</span>
        <TextArea
          placeholder="请输入备注"
          rows={4}
          value={state.remark}
          onChange={($event: any) => onRemarkChange($event.target.value)}
        />
      </Modal>
    </Spin>
  );
}
