import * as React from 'react';
import { usePositionMonitorDrawerLeftStore } from './position-monitor-drawer-left.component.store';
import { Drawer } from 'antd';
import { setDataAction } from '../position-monitor-redux/position-monitor-action';
import { PositionMonitorContext } from '../position-monitor.component';
import { ISelectLoadingComponent, ITableComponent } from '~/solution/components/component.module';
import { positionMonitorDrawerLeftColumns } from './position-monitor-drawer-left.column';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

export const PositionMonitorDrawerLeftComponent = () => {
  const { state, onCheckedUserInfo, onCheckedUserSelectAllInfo } = usePositionMonitorDrawerLeftStore();
  const { isLoading, searchForm, tableData, total, selectedRowKeys } = state;

  const { reduxState, dispatch } = React.useContext(PositionMonitorContext);
  const { leftDrawerVisible, currentSelectNode }: any = reduxState;
  const tableParams = React.useMemo(
    () => ({
      columns: positionMonitorDrawerLeftColumns(),
      isLoading,
      pageIndex: searchForm.index,
      pageSize: searchForm.size,
      data: tableData,
      rowSelection: {
        onSelect: onCheckedUserInfo,
        selectedRowKeys: selectedRowKeys,
        onSelectAll: onCheckedUserSelectAllInfo
      },
      size: 'small' as SizeType,
      total: total,
      changeTablePageIndex: (index: number, pageSize: number) => changeTablePageIndex()
    }),
    [searchForm.index, searchForm.size, isLoading, tableData, selectedRowKeys, total]
  );
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
        <div style={{ margin: '10px -24px' }}>{RenderTable()}</div>
      </div>
    );
  }

  // component --- 渲染table
  function RenderTable() {
    return <ITableComponent {...tableParams} />;
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
};
