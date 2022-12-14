import * as React from 'react';
import { usePositionMonitorDrawerLeftStore } from './position-monitor-drawer-left.component.store';
import { Drawer, Select } from 'antd';
import { setDataAction } from '../position-monitor-redux/position-monitor-action';
import { PositionMonitorContext } from '../position-monitor.component';
import { ISelectLoadingComponent, ITableComponent } from '~/solution/components/component.module';
import { positionMonitorDrawerLeftColumns } from './position-monitor-drawer-left.column';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
const { Option } = Select;
export const PositionMonitorDrawerLeftComponent = () => {
  const {
    state,
    onCheckedUserInfo,
    onCheckedUserSelectAllInfo,
    changeTablePageIndex,
    onCurrentVehicleChange
  } = usePositionMonitorDrawerLeftStore();
  const { searchForm, tableData, total, selectedRowKeys, vehicleGroupList, tableLoading } = state;

  const { reduxState, dispatch } = React.useContext(PositionMonitorContext);
  const { leftDrawerVisible, currentSelectNode }: any = reduxState;
  const tableParams = React.useMemo(
    () => ({
      columns: positionMonitorDrawerLeftColumns(),
      pageIndex: searchForm.index,
      pageSize: searchForm.size,
      data: tableData,
      rowSelection: {
        onSelect: onCheckedUserInfo,
        selectedRowKeys: selectedRowKeys,
        onSelectAll: onCheckedUserSelectAllInfo,
        getCheckboxProps: (row: any) => ({
          disabled: !row.deviceList.length
        })
      },
      size: 'small' as SizeType,
      total: total,
      isLoading: tableLoading,
      changeTablePageIndex: (index: number, pageSize: number) => changeTablePageIndex(index, pageSize)
    }),
    [searchForm.index, searchForm.size, tableData, selectedRowKeys, total, tableLoading]
  );
  console.log('searchForm.vehicleGroupId', searchForm.vehicleGroupId);

  function DrawerContent() {
    return (
      <div>
        <div>
          <Select
            onChange={onCurrentVehicleChange}
            placeholder="??????????????????"
            allowClear
            value={searchForm.vehicleGroupId}
            style={{ width: '200px' }}
          >
            {vehicleGroupList.map(item => {
              return (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        </div>
        <div style={{ margin: '10px -24px' }}>{RenderTable()}</div>
      </div>
    );
  }

  // component --- ??????table
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
