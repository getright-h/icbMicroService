import * as React from 'react';
import style from './monitor-manage.component.less';
import { useMonitorManageStore } from './monitor-manage.component.store';
import { IHeaderTitleComponent, ITableComponent, TablePageTelComponent } from '~framework/components/component.module';
import { monitorColumns } from './monitor-manage-column';
import { Form, Button, Input } from 'antd';
import { ModalType } from '../monitor-manage.const';
import OrganizationControllerComponent from '~/solution/components/organization-controller-component/organization-controller.component';
import AddMonitorGroupComponent from './add-monitor-group-component/add-monitor-group.component';
import AddMonitorCarComponent from './add-monitor-car-component/add-monitor-car.component';
import TransformMonitorComponent from './transform-monitor-component/transform-monitor.component';
export default function MonitorManageComponent() {
  const {
    state,
    callbackAction,
    changeTablePageIndex,
    onChange,
    searchClick,
    handleModalCancel,
    searchValueChange,
    getMonitorGroupList,
    onExpand,
    onCheck
  } = useMonitorManageStore();
  const {
    isLoading,
    searchForm = {},
    tableData,
    total,
    currentData,
    addGroupModalVisible = false,
    addCarModalVisible = false,
    transformModalVisible = false,
    groupId,
    expandedKeys,
    checkedKeys
  } = state;
  function renderSelectItems() {
    return (
      <>
        <div className="push-search-item">
          <span className="label">查找车辆:</span>
          <Input
            allowClear
            placeholder="请输入设备号/车架号"
            onChange={e => {
              onChange(e.target.value, 'keyword');
            }}
          />
        </div>
      </>
    );
  }
  function renderSearchButtons() {
    return (
      <div className="other-search-button-item">
        <Button type="primary" onClick={searchClick}>
          查询
        </Button>
      </div>
    );
  }
  function RenderTable() {
    return (
      <ITableComponent
        columns={monitorColumns(callbackAction)}
        isLoading={isLoading}
        pageIndex={searchForm.index}
        pageSize={searchForm.size}
        data={tableData}
        total={total}
        isPagination={true}
        rowSelection={[]}
        changeTablePageIndex={(index: number, pageSize: number) => changeTablePageIndex(index, pageSize)}
      ></ITableComponent>
    );
  }

  function RenderTree() {
    const prganizationControllerComponentProps = {
      expandedKeys,
      onExpand,
      getCheckedInfo: onCheck,
      checkedKeys
    };
    return (
      <div>
        <OrganizationControllerComponent checkable {...prganizationControllerComponentProps} />
      </div>
    );
  }
  return (
    <div className={style.monitor}>
      <IHeaderTitleComponent pageName={'监控组管理'}>
        <div className={style.btnArea}>
          <Button onClick={() => callbackAction(ModalType.ADD_GROUP)}>添加监控组</Button>
          <div>
            <Button onClick={() => callbackAction(ModalType.ADD_CAR)}>添加监控车辆</Button>
            <Button style={{ marginLeft: 20 }} onClick={() => callbackAction(ModalType.BATCH_TRANFROM)}>
              批量转组
            </Button>
          </div>
        </div>
      </IHeaderTitleComponent>
      <TablePageTelComponent
        selectItems={renderSelectItems()}
        pageLeft={RenderTree}
        searchButton={renderSearchButtons()}
        table={<RenderTable />}
      />
      <TransformMonitorComponent close={handleModalCancel} visible={transformModalVisible} />
      <AddMonitorCarComponent addMonitorModal={addCarModalVisible} colse={handleModalCancel} groupId={groupId} />
      <AddMonitorGroupComponent close={handleModalCancel} data={currentData} visible={addGroupModalVisible} />
    </div>
  );
}
