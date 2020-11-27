import * as React from 'react';
import style from './position-monitor-drawer-left.component.less';
import { usePositionMonitorDrawerLeftStore } from './position-monitor-drawer-left.component.store';
import { Drawer } from 'antd';
import { setDataAction } from '../position-monitor-redux/position-monitor-action';
import { PositionMonitorContext } from '../position-monitor.component';
import { ISelectLoadingComponent, ITableComponent } from '~/solution/components/component.module';
import { positionMonitorDrawerLeftColumns } from './position-monitor-drawer-left.column';

export default function PositionMonitorDrawerLeftComponent() {
  const { state, onCheckedUserInfo, onCheckedUserSelectAllInfo } = usePositionMonitorDrawerLeftStore();
  const { isLoading, searchForm, tableData, total, selectedRowKeys } = state;

  const { reduxState, dispatch } = React.useContext(PositionMonitorContext);
  const { leftDrawerVisible, currentSelectNode }: any = reduxState;

  function changeTablePageIndex() {}
  const ISelectWatchLoadingComponent = React.useCallback(
    () =>
      ISelectLoadingComponent({
        placeholder: '选择监控组',
        showSearch: true,
        width: '200px',
        isData: true,
        allowClear: false,
        reqUrl: 'queryStoreListByOrganizationId'
        // getCurrentSelectInfo: (...info) => getCurrentSelectInfo(field, ...info, 'store')
      }),
    []
  );
  function DrawerContent() {
    return (
      <div>
        <div>{ISelectWatchLoadingComponent()}</div>
        <div style={{ margin: '10px -24px' }}>{renderTable()}</div>
      </div>
    );
  }

  // component --- 渲染table
  function renderTable() {
    return (
      <ITableComponent
        columns={positionMonitorDrawerLeftColumns()}
        isLoading={isLoading}
        pageIndex={searchForm.index}
        pageSize={searchForm.size}
        data={tableData}
        // showHeader={false}
        rowSelection={{
          onSelect: onCheckedUserInfo,
          selectedRowKeys: selectedRowKeys,
          onSelectAll: onCheckedUserSelectAllInfo
        }}
        size="small"
        total={total}
        changeTablePageIndex={(index: number, pageSize: number) => changeTablePageIndex()}
      ></ITableComponent>
    );
  }

  return (
    <Drawer
      title={currentSelectNode?.name}
      placement="left"
      closable={true}
      headerStyle={{ paddingLeft: '10px' }}
      onClose={() => setDataAction({ leftDrawerVisible: false }, dispatch)}
      visible={leftDrawerVisible}
      getContainer={false}
      style={{ position: 'absolute' }}
    >
      {DrawerContent()}
    </Drawer>
  );
}
