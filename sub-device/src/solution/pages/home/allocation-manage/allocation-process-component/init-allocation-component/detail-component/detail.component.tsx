import * as React from 'react';
import style from './detail.component.less';
import { useDetailStore } from './detail.component.store';
import { Form, Button, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { ALLOW_FLOW_ENUM, ModalType, APPROVAL_FLOW_STATUS_ENUM } from '~shared/constant/common.const';
import { IHeaderTitleComponent } from '~framework/components/component.module';
import DeviceImportComponent from '../device-import-component/device-import.component';
import RollbackApplyComponent from '../rollback-apply-component/rollback-apply.component';
export default function DetailComponent() {
  const {
    state,
    $auth,
    callbackAction,
    handleModalCancel,
    getAlloactionDetail,
    allocationOperate,
    handleDownLoadAllot
  } = useDetailStore();
  const { detail = {}, importVisible, currentData, rollbackVisible } = state;
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 }
  };

  /**
   * @description 根据[  调拨状态 ] 渲染操作按钮
   */
  function RenderOperateBtn({ data }: any) {
    const { state, approvalState } = data;

    const back = (
      <Button
        className={style.button}
        onClick={() => {
          callbackAction(ModalType.GO_BACK, data);
        }}
        key={0}
      >
        返回
      </Button>
    );
    if (!state) {
      return back;
    }
    const btnState = [
      // 发起申请操作
      {
        condition: [ALLOW_FLOW_ENUM.Apply],
        btn: (
          APPROVAL_FLOW_STATUS_ENUM.Success === approvalState ?  <Button
            type={'primary'}
            className={style.button}
            onClick={() => callbackAction(ModalType.CREATE, data)}
            key={1}
            disabled={!$auth['applyAllot']}
          >
            发起申请
          </Button> : null
        )
      },

      // 撤销操作
      {
        condition: [ALLOW_FLOW_ENUM.Confirm],
        btn:
          APPROVAL_FLOW_STATUS_ENUM.Success === approvalState ? (
            <Button
              type={'primary'}
              danger
              className={style.button}
              onClick={() => callbackAction(ModalType.REVOKE, data)}
              key={2}
            >
              撤销
            </Button>
          ) : null
      },

      // 重新申请操作
      {
        condition: [ALLOW_FLOW_ENUM.Recall, ALLOW_FLOW_ENUM.Reject, ALLOW_FLOW_ENUM.Return],
        btn: (
          <Button
            type={'primary'}
            className={style.button}
            onClick={() => callbackAction(ModalType.REAPPLY, data)}
            key={3}
          >
            重新申请
          </Button>
        )
      },

      // 收到退货操作
      {
        condition: [ALLOW_FLOW_ENUM.Returning],
        btn: (
          <Button
            type={'primary'}
            className={style.button}
            onClick={() => callbackAction(ModalType.RETURN, data)}
            key={4}
          >
            收到退货
          </Button>
        )
      }
    ];
    const btnArray = btnState.filter((item: any) => item.condition.includes(state)).map((btn: any) => btn.btn);
    btnArray.push(back);
    return <React.Fragment>{btnArray}</React.Fragment>;
  }
  function RenderTable() {
    const columns: ColumnsType<any> = [
      {
        title: '设备型号',
        dataIndex: 'typeName',
        key: 'typeName'
      },
      {
        title: '设备个数',
        dataIndex: 'number',
        key: 'number',
        render: text => <span>{text}个</span>
      }
    ];
    return (
      <div className={style.tableWapper}>
        <Table
          bordered={true}
          rowKey="typeName"
          size="middle"
          columns={columns}
          dataSource={detail.deviceTypeList || []}
          pagination={false}
        />
        <a className={style.exportExcel} onClick={handleDownLoadAllot}>
          导出excel表
        </a>
      </div>
    );
  }

  function renderFlowList() {
    function renderArrow() {
      return (
        <div className={style.arrowWapepr}>
          <div className={style.line}>
            <i className="arrow"></i>
          </div>
        </div>
      );
    }
    return (
      <div className={style.flowLListContainer}>
        <div className={style.flowNode}>{detail.currentPromoterStoreName}</div>
        {renderArrow()}
        <div className={style.flowNode}>{detail.currentRecipientStoreName}</div>
      </div>
    );
  }
  return (
    <div className={style.mainForm}>
      <IHeaderTitleComponent pageName={'调拨单详情'} />
      <Form {...layout}>
        <div className={style.formPart}>
          <div className={style.formItems}>
            <div className={style.formLeft}>
              <Form.Item label={<strong>调拨单号</strong>}>{detail.allotCode}</Form.Item>
              <Form.Item label={<strong>调拨设备</strong>}>
                <RenderTable />
              </Form.Item>
              <Form.Item label={<strong>调拨总数</strong>}>
                {Array.isArray(detail.deviceTypeList) &&
                  detail.deviceTypeList
                    .map((item: any) => item.number)
                    .reduce((per: number, next: number) => per + next, 0)}
              </Form.Item>
              <Form.Item label={<strong>操作时间</strong>}>{detail.createTime || '-'}</Form.Item>
              <Form.Item label={<strong>节点流程</strong>}>{renderFlowList()}</Form.Item>
              <Form.Item label={<strong>操作人</strong>}>{detail.creatorName || '-'}</Form.Item>
              <Form.Item label={<strong>状态</strong>}>{detail.stateText}</Form.Item>
              {ALLOW_FLOW_ENUM.Reject == detail.state && (
                <Form.Item label={<strong>驳回理由</strong>}>{detail.rejectRemark || '-'}</Form.Item>
              )}

              <Form.Item wrapperCol={{ span: 12, offset: 8 }}>{<RenderOperateBtn data={detail} />}</Form.Item>
            </div>
          </div>
        </div>
      </Form>
      {importVisible && (
        <DeviceImportComponent
          visible={importVisible}
          close={handleModalCancel}
          data={currentData}
          getAlloactionDetail={getAlloactionDetail}
        />
      )}

      <RollbackApplyComponent
        allocationOperate={allocationOperate}
        getAlloactionDetail={getAlloactionDetail}
        data={currentData}
        visible={rollbackVisible}
        close={handleModalCancel}
      />
    </div>
  );
}
