import * as React from 'react';

import { TablePageTelComponent, TimePickerComponent } from '~/framework/components/component.module';
import { ITableComponent } from '~/framework/components/component.module';
import { initAllocationColumns } from './init-allocation.column';
import { useInitAllocationStore } from './init-allocation.component.store';
import { ALLOW_FLOW } from '~shared/constant/common.const';
import { Button, Input, Select } from 'antd';
import DeviceImportComponent from './device-import-component/device-import.component';
import RollbackApplyComponent from './rollback-apply-component/rollback-apply.component';

const { Option } = Select;

export default function InitAllocationComponent() {
  const {
    state,
    callbackAction,
    changeTablePageIndex,
    searchClick,
    handleModalCancel,
    openModal,
    getTableData,
    onChange,
    allocationOperate
  } = useInitAllocationStore();
  const { isLoading, searchForm, tableData, total, importVisible, rollbackVisible, currentData } = state;
  function renderSelectItems() {
    return (
      <>
        <div className="push-search-item">
          <span className="label">调拨单号:</span>
          <Input
            allowClear
            placeholder="请输入调拨单号"
            onChange={e => {
              onChange(e.target.value, 'allotCode');
            }}
          />
        </div>
        <div className="push-search-item">
          <span className="label">目标仓库:</span>
          <Input
            allowClear
            placeholder="请输入仓库名"
            onChange={e => {
              onChange(e.target.value, 'storeName');
            }}
          />
        </div>
        <div className="push-search-item">
          <span className="label">调拨状态:</span>
          <Select
            defaultValue={-1}
            placeholder="请选择"
            onChange={value => {
              onChange(value, 'state');
            }}
          >
            {ALLOW_FLOW.map((item: any, index: number) => (
              <Option key={index} value={item.value}>
                {item.title}
              </Option>
            ))}
          </Select>
        </div>
        <div className="push-search-item">
          <span className="label">调拨时间:</span>
          <TimePickerComponent
            pickerType="dateRange"
            getDateTimeInfo={(time: any, other: any) => onChange(time, 'time')}
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
        <Button>清空</Button>
      </div>
    );
  }
  function RenderTable() {
    return (
      <ITableComponent
        columns={initAllocationColumns(callbackAction)}
        isLoading={isLoading}
        pageIndex={searchForm.index}
        pageSize={searchForm.size}
        data={tableData}
        total={total}
        isPagination={true}
        changeTablePageIndex={(index: number, pageSize: number) => changeTablePageIndex(index, pageSize)}
      ></ITableComponent>
    );
  }

  return (
    <React.Fragment>
      <TablePageTelComponent
        selectItems={renderSelectItems()}
        searchButton={renderSearchButtons()}
        table={<RenderTable />}
      ></TablePageTelComponent>
      {/* <DeviceImportComponent visible={importVisible} close={handleModalCancel} /> */}
      <DeviceImportComponent
        visible={importVisible}
        close={handleModalCancel}
        data={currentData}
        getTableData={getTableData}
      />
      <RollbackApplyComponent
        allocationOperate={allocationOperate}
        visible={rollbackVisible}
        close={handleModalCancel}
        data={currentData}
        getTableData={getTableData}
      />
    </React.Fragment>
  );
}
