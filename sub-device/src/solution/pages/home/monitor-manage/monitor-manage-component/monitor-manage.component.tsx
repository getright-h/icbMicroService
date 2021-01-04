import React from 'react';
import style from './monitor-manage.component.less';
import { useMonitorManageStore } from './monitor-manage.component.store';
import { IHeaderTitleComponent, ITableComponent, TablePageTelComponent } from '~framework/components/component.module';
import { monitorColumns } from './monitor-manage-column';
import { Button, Input } from 'antd';
import { ModalType } from '../monitor-manage.const';
import OrganizationControllerComponent from '~/solution/components/organization-controller-component/organization-controller.component';
import AddMonitorGroupComponent from './add-monitor-group-component/add-monitor-group.component';
import AddMonitorCarComponent from './add-monitor-car-component/add-monitor-car.component';
import TransformMonitorComponent from './transform-monitor-component/transform-monitor.component';
import SetAlarmModalComponent from './set-alarm-model-component/set-alarm-model-component';
export default function MonitorManageComponent() {
  const {
    state,
    organizationControllerRef,
    callbackAction,
    changeTablePageIndex,
    onChange,
    searchClick,
    handleModalCancel,
    queryChildInfo,
    onExpand,
    onSelect,
    getTableData,
    deletemonitorGroup,
    editmonitorGroup,
    onSelectChange
  } = useMonitorManageStore();
  const {
    treeSelectedKeys,
    isLoading,
    searchForm = {},
    tableData,
    total,
    currentData,
    addGroupModalVisible = false,
    addCarModalVisible = false,
    transformModalVisible = false,
    alarmModalVisible = false,
    expandedKeys,
    checkedKeys,
    transformDisable = true,
    selectedRowKeys = [],
    currentMonitorGroup,
    transformSelected
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
              onChange(e.target.value, 'vinNo');
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
        rowSelection={{
          preserveSelectedRowKeys: true,
          selectedRowKeys,
          onChange: onSelectChange
        }}
        changeTablePageIndex={(index: number, pageSize: number) => changeTablePageIndex(index, pageSize)}
      ></ITableComponent>
    );
  }

  function monitorGroupAction(element: any) {
    return (
      <div className="actions">
        <a onClick={() => deletemonitorGroup(element)} className="a-link">
          删除
        </a>
        <p></p>
        <a onClick={() => editmonitorGroup(element)} className="a-link">
          修改
        </a>
      </div>
    );
  }
  function RenderTree() {
    const prganizationControllerComponentProps = {
      warehouseAction: monitorGroupAction,
      onSelect,
      expandedKeys,
      onExpand,
      treeSelectedKeys,
      checkedKeys,
      queryChildInfo,
      checkable: false,
      isGroup: true,
      ref: organizationControllerRef
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
            {currentMonitorGroup.id && <Button onClick={() => callbackAction(ModalType.ADD_CAR)}>添加监控车辆</Button>}
            <Button
              disabled={!currentMonitorGroup.id}
              type={'primary'}
              style={{ marginLeft: 20 }}
              onClick={() => callbackAction(ModalType.ALARM)}
            >
              报警通知
            </Button>
            <Button
              disabled={transformDisable}
              type={!transformDisable ? 'primary' : 'default'}
              style={{ marginLeft: 20 }}
              onClick={() => callbackAction(ModalType.BATCH_TRANFROM)}
            >
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
      {transformModalVisible && (
        <TransformMonitorComponent
          close={handleModalCancel}
          visible={transformModalVisible}
          data={{
            currentMonitorGroup: currentMonitorGroup,
            selectedRowKeys: transformSelected,
            ...currentData
          }}
        />
      )}
      {addCarModalVisible && (
        <AddMonitorCarComponent
          addMonitorModal={addCarModalVisible}
          colse={handleModalCancel}
          groupId={currentMonitorGroup.id}
          getMonitorGroupList={getTableData}
        />
      )}
      {alarmModalVisible && (
        <SetAlarmModalComponent close={handleModalCancel} data={currentMonitorGroup} visible={alarmModalVisible} />
      )}
      {addGroupModalVisible && (
        <AddMonitorGroupComponent close={handleModalCancel} data={currentData} visible={addGroupModalVisible} />
      )}
    </div>
  );
}
