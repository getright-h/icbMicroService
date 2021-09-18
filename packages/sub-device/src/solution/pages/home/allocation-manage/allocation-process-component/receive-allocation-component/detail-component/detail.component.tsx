import * as React from 'react';
import style from './detail.component.less';
import { useDetailStore } from './detail.component.store';
import { Form, Button, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { ALLOW_FLOW_ENUM, ModalType } from '~shared/constant/common.const';
import { IHeaderTitleComponent } from 'fch-shop-component-micweb';
import RejectAllocationComponent from '../reject-allocation-component/reject-allocation.component';
import DeviceImportComponent from '../../init-allocation-component/device-import-component/device-import.component';
export default function DetailComponent() {
  const {
    state,
    callbackAction,
    handleModalCancel,
    allocationOperate,
    getAlloactionDetail,
    handleDownLoadAllot
  } = useDetailStore();
  const { currentData, currentActionType, detail = {}, rejectVisibleModal, importVisible } = state;
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 }
  };

  /**
   * @description 根据[  调拨状态 ] 渲染操作按钮
   */
  function renderOperateBtn(data: any) {
    const { state, isMove } = data;
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
    /**
     * 1.仓库属于节点中，存在流转，出现流转按钮
     * 2.仓库处于流程最末端，不会显示你流转按钮
     * 根据后端字段显示
     */
    const moveAllot = (
      <Button
        type={'primary'}
        className={style.button}
        onClick={() => {
          callbackAction(ModalType.MOVE, data);
        }}
        key={'move'}
      >
        流转
      </Button>
    );
    if (!state) {
      return back;
    }
    const btnState = [
      // 驳回操作 & 接收操作
      {
        condition: [ALLOW_FLOW_ENUM.Confirm],
        btn: (
          <div key={'Confirm'} style={{ display: 'inline-block' }}>
            <Button
              type={'primary'}
              danger
              className={style.button}
              onClick={() => callbackAction(ModalType.REJECT, data)}
              key={2}
            >
              驳回
            </Button>
            <Button
              type={'primary'}
              className={style.button}
              onClick={() => callbackAction(ModalType.RECIVE, data)}
              key={1}
            >
              接收
            </Button>
          </div>
        )
      },

      // 通过操作 & 退货操作
      {
        condition: [ALLOW_FLOW_ENUM.Inspection],
        btn: (
          <div key={'Inspection'} style={{ display: 'inline-block' }}>
            <Button
              type={'primary'}
              className={style.button}
              onClick={() => callbackAction(ModalType.PASS, data)}
              key={3}
            >
              通过
            </Button>
            <Button
              type={'primary'}
              danger
              className={style.button}
              onClick={() => callbackAction(ModalType.SET_RETURN, data)}
              key={4}
            >
              退货
            </Button>
          </div>
        )
      }
    ];
    const btnArray = btnState.filter((item: any) => item.condition.includes(state)).map((btn: any) => btn.btn);
    btnArray.push(back);
    isMove && btnArray.push(moveAllot);
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
        <Table size="middle" columns={columns} dataSource={detail.deviceTypeList || []} pagination={false} />
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
      {/* 此处申请驳回将 退回 待确认 待验货 */}
      <IHeaderTitleComponent pageName={'调拨单详情'} className="flexJusBetw">
        {[
          ALLOW_FLOW_ENUM.Reject, // 已驳回
          ALLOW_FLOW_ENUM.Inspection, // 待验货
          ALLOW_FLOW_ENUM.Returning, // 退货中
          ALLOW_FLOW_ENUM.Identification // 已收货
        ].includes(detail.state) && (
          <Button danger type={'primary'} onClick={() => callbackAction(ModalType.APPLY_REVOKE, detail)}>
            申请撤销
          </Button>
        )}
      </IHeaderTitleComponent>
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

              <Form.Item wrapperCol={{ span: 12, offset: 8 }}>{renderOperateBtn(detail)}</Form.Item>
            </div>
          </div>
        </div>
      </Form>
      <RejectAllocationComponent
        allocationOperate={allocationOperate}
        visible={rejectVisibleModal}
        data={currentData}
        getAlloactionDetail={getAlloactionDetail}
        close={handleModalCancel}
        currentActionType={currentActionType}
      />
      <DeviceImportComponent
        visible={importVisible}
        close={handleModalCancel}
        data={currentData}
        getAlloactionDetail={getAlloactionDetail}
        isMove={true}
      />
    </div>
  );
}
