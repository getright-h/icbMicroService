import * as React from 'react';
import style from './monitor-manage.component.less';
import { useMonitorManageStore } from './monitor-manage.component.store';
import { ITableComponent, TablePageTelComponent } from '~framework/components/component.module';
import { IHeaderTitleComponent } from 'fch-shop-component-micweb';
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
    $auth,
    callbackAction,
    changeTablePageIndex,
    onChange,
    searchClick,
    handleModalCancel,
    queryChildInfo,
    onExpand,
    onSelect,
    getTableData,
    setSingleCheckTreeData,
    onSelectChange,
    alertCurrentTreeData,
    monitorGroupAction,
    appendNewNodeToCurrentTreeData
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
            placeholder="请输入车架号"
            onChange={e => {
              onChange(e.target.value, 'vinNo');
            }}
          />
        </div>
        <div className="push-search-item">
          <span className="label">设备号:</span>
          <Input
            allowClear
            placeholder="请输入设备号"
            onChange={e => {
              onChange(e.target.value, 'code');
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
        columns={monitorColumns(callbackAction, $auth)}
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
          <Button onClick={() => callbackAction(ModalType.ADD_GROUP)} disabled={!$auth['addVehicleGroup']}>
            添加监控组
          </Button>
          <div>
            {currentMonitorGroup.id && (
              <Button onClick={() => callbackAction(ModalType.ADD_CAR)} disabled={!$auth['addMonitoringVehicle']}>
                添加监控车辆
              </Button>
            )}
            <Button
              disabled={!currentMonitorGroup.id || !$auth['alarmNotification']}
              type={'primary'}
              style={{ marginLeft: 20 }}
              onClick={() => callbackAction(ModalType.ALARM)}
            >
              报警通知
            </Button>
            <Button
              disabled={transformDisable || !$auth['batchMoveVehicleGroup']}
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
          setSingleCheckTreeData={setSingleCheckTreeData}
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
        <AddMonitorGroupComponent
          close={handleModalCancel}
          data={currentData}
          visible={addGroupModalVisible}
          alertCurrentTreeData={alertCurrentTreeData}
          appendNewNodeToCurrentTreeData={appendNewNodeToCurrentTreeData}
        />
      )}
    </div>
  );
}
